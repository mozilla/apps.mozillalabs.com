#!/usr/bin/env python

import sys
import urllib2
import urlparse
import json

db = [ ]

line = sys.stdin.readline()
while line:
    url = line.strip()
    try:
        u = urllib2.urlopen(url);
        manifest = u.read()
        o = urlparse.urlparse(url)
        origin = o.scheme + "://" + o.netloc;
        if manifest.startswith("\xef\xbb\xbf"):
            manifest = manifest[3:]
        item = { }
        item["src_url"] = url
        item["origin"] = origin
        item["manifest"] = json.loads(manifest)
        db.append(item)
    except (ValueError, RuntimeError, urllib2.HTTPError, urllib2.URLError) as e:
        print >> sys.stderr, "WARNING: Can't read manifest (%s), skipping %r" % (e, url)
    line = sys.stdin.readline()

# re-sort by name
db.sort(key=lambda x: x["manifest"]["name"])

print json.dumps(db)
