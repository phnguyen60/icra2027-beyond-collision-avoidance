ICRA 2027 workshop website — published static content

Public address: https://icra2027.soft-aerial-robotics.com/

Publish this directory at the GitHub Pages site root. Keep CNAME and
.nojekyll at that root. Enable HTTPS after domain verification and
certificate provisioning succeed.

The editable source remains in the original project workspace. To rebuild
and refresh the deployment files, run there:
    python3 outputs/website/scripts/build.py
    python3 outputs/website/scripts/prepare_github_pages.py

The prep script copies reviewed assets, adds public URL metadata, and
preserves Git metadata and unknown files. Keep the bundled font licenses.
New asset filenames must first be added to the script's explicit allowlist.

Keep the proposed workshop status, contributors, programme, and dates current.
