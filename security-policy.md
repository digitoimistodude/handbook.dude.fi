---
description: In English for disclosure.
---

# Security Policy

At Digitoimisto Dude Oy (Finnish limited company), we offer top quality hosting and upkeep for our clients. Most of them lack comprehensive knowledge of security or privacy issues. That’s why we ask you to report the security issues directly to us.

After receiving a disclosure, we will let all affected customers know about that with all the necessary details included. If the disclosed issue is severe or the reporter asks us, we’ll ensure that the client acknowledges receipt of the information directly to the reporter.

Please submit security and privacy risk or issue disclosures via mail to [security@dude.fi](mailto:security@dude.fi).

To protect our customers, we request that you do not publicly post or share any information about disclosed issues until we have researched, responded to, and addressed the reported issue and informed customers.

### Bounty price

We fully reserve the right to decide the amount of the bounty (usually from 10 to 50 $). Bounty payments with **PayPal only**.

### Not eligible security reports - no bounty

The following things **are not** eligible for security reports, as we’ve taken **other precautions** to mitigate the possible problems:

* Systems that are not under our control, like [status.dude.fi](https://status.dude.fi/)
* Internal tools like Syncthing that have authentication page and are otherwise open to the public and secured in other ways
* Endpoints like gtag.dude.fi or APIs that do not require strong ciphers
* The lack of Certificate Authority Authorization (CAA)
* Plausible (analytics.dude.fi) upstream, please report these to [security@plausible.io](mailto:security@plausible.io)
* Open REST API /users/ endpoint
* Open author archives (user enumeration)
* Sites under subdomains that are not under our control or servers
* Public archived GitHub repositories
* Reveal.js based or any other repository for presentations
* Autoindex for [slides.dude.fi](https://slides.dude.fi)
* The lack of visible rate limits on forms
* The lack of certain max character limit in forms
* HSTS/HTTPS preloading, see [this](https://www.techtarget.com/searchsecurity/answer/Why-is-preloading-HTTP-Strict-Transport-Security-risky)
* Tabnabbing / target="\_blank" (see [this](https://www.dude.fi/uuteen-valilehteen-aukeavat-linkit), in Finnish)
* Vulnerabilities that have severity of very low, best practice or info, like clickjacking
* Info leakage like nginx version or leftover phpinfo
* [maamerkit.dude.fi](https://maamerkit.dude.fi/) or other temporary sites with embeds on them
