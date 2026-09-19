# Security policy

This repository is my personal portfolio, a site published at https://ganeshtharu.com.np. There is no server, database or login behind it, so the realistic problems are a vulnerable dependency, a leaked secret, a weakness in the build or deploy workflows, or something on the page that should not be there.

## Reporting a vulnerability

Please report it privately through GitHub: [report a vulnerability](https://github.com/ganesh-786/Ganesh-Portfolio/security/advisories/new). Please do not open a public issue or pull request for it.

It helps if the report says what you found, where, and how to reproduce it. I read every report myself and aim to reply within a week. If the problem is real I will correct it, credit you if you would like that, and publish an advisory once the correction is live.

## What is covered

- The site at ganeshtharu.com.np.
- The code and workflows in this repository.

## What is not covered

- Mail delivery for the contact form. That is a third party service (Web3Forms), so report problems with it to them. The form's access key is meant to be public and is safe to see in the page source.
- Missing HTTP response headers. GitHub Pages does not let a repository set its own, so the site sets a Content-Security-Policy in the page itself.
- Automated scanner output without a demonstrated impact.

## Supported versions

Only what is live now, which is the main branch.
