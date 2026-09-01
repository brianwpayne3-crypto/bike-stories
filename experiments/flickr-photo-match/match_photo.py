#!/usr/bin/env python3
"""Authenticate to Flickr and test matching a private photo by capture metadata."""

import argparse
import os
import sys
import webbrowser
from datetime import datetime, timedelta

from requests_oauthlib import OAuth1Session

REQUEST_TOKEN_URL = "https://www.flickr.com/services/oauth/request_token"
AUTHORIZE_URL = "https://www.flickr.com/services/oauth/authorize"
ACCESS_TOKEN_URL = "https://www.flickr.com/services/oauth/access_token"
REST_URL = "https://www.flickr.com/services/rest/"


def required_env(name):
    value = os.getenv(name)
    if not value:
        sys.exit(f"Missing environment variable: {name}")
    return value


def authorize(api_key, api_secret):
    oauth = OAuth1Session(api_key, client_secret=api_secret, callback_uri="oob")
    token = oauth.fetch_request_token(REQUEST_TOKEN_URL)
    resource_owner_key = token["oauth_token"]
    resource_owner_secret = token["oauth_token_secret"]
    auth_url = f"{AUTHORIZE_URL}?oauth_token={resource_owner_key}&perms=read"
    print("Opening Flickr authorization page...")
    webbrowser.open(auth_url)
    verifier = input("After approving read-only access, enter the verifier code Flickr shows: ").strip()
    oauth = OAuth1Session(api_key, client_secret=api_secret, resource_owner_key=resource_owner_key,
                          resource_owner_secret=resource_owner_secret, verifier=verifier)
    return oauth.fetch_access_token(ACCESS_TOKEN_URL)


def api_call(oauth, method, **kwargs):
    params = {"method": method, "format": "json", "nojsoncallback": "1", **kwargs}
    response = oauth.get(REST_URL, params=params)
    response.raise_for_status()
    payload = response.json()
    if payload.get("stat") != "ok":
        sys.exit(f"Flickr API error from {method}: {payload}")
    return payload


def original_dimensions(oauth, photo_id):
    payload = api_call(oauth, "flickr.photos.getSizes", photo_id=photo_id)
    sizes = payload["sizes"]["size"]
    largest = max(sizes, key=lambda s: int(s.get("width", 0)) * int(s.get("height", 0)))
    return int(largest["width"]), int(largest["height"]), largest.get("label", "")


def exif_summary(oauth, photo_id):
    payload = api_call(oauth, "flickr.photos.getExif", photo_id=photo_id)
    useful = []
    for item in payload.get("photo", {}).get("exif", []):
        label = item.get("label", "")
        tag = item.get("tag", "")
        raw = item.get("raw", {}).get("_content", "")
        if any(word in (label + " " + tag).lower() for word in
               ("file", "name", "date", "time", "image", "unique", "serial")):
            useful.append(f"{label or tag}={raw}")
    return useful


def flickr_search(api_key, api_secret, access_token, access_secret, taken, width, height, inspect_exif):
    oauth = OAuth1Session(api_key, client_secret=api_secret,
                          resource_owner_key=access_token, resource_owner_secret=access_secret)
    start = taken - timedelta(minutes=2)
    end = taken + timedelta(minutes=2)
    payload = api_call(oauth, "flickr.photos.search", user_id="me",
                       min_taken_date=start.strftime("%Y-%m-%d %H:%M:%S"),
                       max_taken_date=end.strftime("%Y-%m-%d %H:%M:%S"),
                       extras="date_taken", per_page="100")

    photos = payload["photos"]["photo"]
    print(f"Flickr returned {len(photos)} photo(s) in the +/- 2 minute window.")
    exact = []
    for photo in photos:
        w, h, label = original_dimensions(oauth, photo["id"])
        print(f"  id={photo['id']} taken={photo.get('datetaken')} largest={w}x{h} ({label}) title={photo.get('title', '')!r}")
        if (w == width and h == height) or (w == height and h == width):
            exact.append(photo)

    print()
    if inspect_exif and exact:
        print("EXIF clues for dimension-matching candidates:")
        for photo in exact:
            clues = exif_summary(oauth, photo["id"])
            print(f"  id={photo['id']}")
            if clues:
                for clue in clues:
                    print(f"    {clue}")
            else:
                print("    (no filename/date/time/unique-id clues returned)")
        print()

    if len(exact) == 1:
        print("MATCH: exactly one Flickr photo matched timestamp window + dimensions.")
        print(f"Flickr photo ID: {exact[0]['id']}")
        return 0
    if not exact:
        print("NO EXACT MATCH: no timestamp candidate matched the expected dimensions.")
        return 2
    print(f"AMBIGUOUS: {len(exact)} timestamp candidates also matched the dimensions.")
    for photo in exact:
        print(f"  candidate Flickr photo ID: {photo['id']}")
    return 3


def parse_args():
    parser = argparse.ArgumentParser(description="Match an Apple Photos capture to a private Flickr photo.")
    parser.add_argument("--taken", default="2026-08-31 20:43:00",
                        help="Apple Photos Date Taken as YYYY-MM-DD HH:MM:SS")
    parser.add_argument("--width", type=int, default=3024)
    parser.add_argument("--height", type=int, default=4032)
    parser.add_argument("--inspect-exif", action="store_true",
                        help="Print potentially identifying EXIF clues for matching candidates")
    return parser.parse_args()


def main():
    args = parse_args()
    api_key = required_env("FLICKR_API_KEY")
    api_secret = required_env("FLICKR_API_SECRET")
    try:
        taken = datetime.strptime(args.taken, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        sys.exit("--taken must use YYYY-MM-DD HH:MM:SS")

    access_token = os.getenv("FLICKR_ACCESS_TOKEN")
    access_secret = os.getenv("FLICKR_ACCESS_SECRET")
    if not access_token or not access_secret:
        token = authorize(api_key, api_secret)
        print("\nAuthorization succeeded. Keep these values private; do NOT commit them:")
        print(f"export FLICKR_ACCESS_TOKEN='{token['oauth_token']}'")
        print(f"export FLICKR_ACCESS_SECRET='{token['oauth_token_secret']}'")
        print("\nRun this script again after exporting those two values.")
        return 0
    return flickr_search(api_key, api_secret, access_token, access_secret,
                         taken, args.width, args.height, args.inspect_exif)


if __name__ == "__main__":
    raise SystemExit(main())
