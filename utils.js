import fetch from "node-fetch";
import isUrl from "is-url-superb";
import ky from "ky-universal";

export const CheckURL = async (url = "https://www.wykop.pl/") => {
  const response = await fetch("https://www.wykop.pl/ajax/add3/init", {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="104", "Opera";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      cookie: process.env.COOKIE,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `url=${encodeURIComponent(url)}&key=${process.env.KEY}&hash=${
      process.env.HASH
    }`,
    method: "POST",
  });

  const data = await response.json();

  if (data.exists) {
    return { exists: data.exists, link: data.link };
  } else {
    return { exists: data.exists };
  }
};

export const checkValidHostname = async (hostname) => {
  if (!isUrl(hostname)) return false;

  const response = await ky.head(hostname, { throwHttpErrors: false });

  return (
    response !== undefined && (response.status < 400 || response.status >= 500)
  );
};
