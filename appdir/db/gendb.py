#!/usr/bin/env python

import sys
import urllib2
import json

db = { }

line = sys.stdin.readline()
while line:
    url = line.strip()
    try:
        u = urllib2.urlopen(url);
        manifest = u.read()
        db[url] = json.loads(manifest)
    except (ValueError, RuntimeError) as e:
        print >> sys.stderr, "WARNING: Can't read manifest, skipping '%s'" % url
    line = sys.stdin.readline()

print json.dumps(db)
