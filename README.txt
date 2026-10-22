ICRA 2027 workshop website — published static content

Public address: https://icra2027.soft-aerial-robotics.com/

Publish the contents of this directory at the GitHub Pages site root.
Keep CNAME and .nojekyll at that root. Enable HTTPS in GitHub Pages after
custom-domain verification and certificate provisioning succeed.

This directory contains deployment files only. The editable workshop data
and source files remain in the original project workspace.

To rebuild the original website, run from that workspace:
    python3 outputs/website/scripts/build.py

Refresh this deployment package from outputs/website/dist using only the
referenced assets. Retain the canonical/Open Graph metadata, CNAME,
.nojekyll, and font licenses; the source build may still contain preview-only
noindex metadata and unused historical images.

The workshop is proposed and pending acceptance. Keep its public status,
confirmed contributors, provisional programme, and contribution dates current.
