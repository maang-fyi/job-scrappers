const axios = require('axios');
const fs = require('fs'); // Import fs for file operations

async function fetchMetaJobs() {
	const url = 'https://www.metacareers.com/graphql';
	const headers = {
		accept: '*/*',
		'accept-language': 'en-US,en;q=0.9,la;q=0.8',
		'content-type': 'application/x-www-form-urlencoded',
		priority: 'u=1, i',
		'sec-ch-ua':
			'"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
		'sec-ch-ua-mobile': '?1',
		'sec-ch-ua-platform': '"Android"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'x-asbd-id': '129477',
		'x-fb-friendly-name': 'CareersJobSearchResultsQuery',
		'x-fb-lsd': 'AVp_ER3kDDY',
		cookie:
			'datr=AFXlZm2dxTnaJXC3hk2w5kv0; ps_l=1; ps_n=1; wd=1014x1384; dpr=2',
		Referer: 'https://www.metacareers.com/jobs/?sort_by_new=true',
		'Referrer-Policy': 'origin-when-cross-origin',
	};

	const body =
		'av=0&__user=0&__a=1&__req=2&__hs=19980.BP%3ADEFAULT.2.0..0.0&dpr=2&__ccg=MODERATE&__rev=1016500779&__s=ekk23c%3Auxqf68%3Auqes87&__hsi=7414442132375102145&__dyn=7xeUmwkHg7ebwKBAg5S1Dxu13wqovzEdEc8uxa1twKzobo1nEhwem0nCq1ewcG0KEswaq1xwEw7Bx61vw4iwBgao1O82Ixe0DopyE3bwkE5G0zE5W0HUvw5rwSyES4E3PwbS1Lwqo3cwbq0x8qw53wtU5K0zU&__csr=&lsd=AVp_ER3kDDY&jazoest=2892&__spin_r=1016500779&__spin_b=trunk&__spin_t=1726309334&__jssesw=1&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CareersJobSearchResultsQuery&variables=%7B%22search_input%22%3A%7B%22q%22%3A%22%22%2C%22divisions%22%3A%5B%5D%2C%22offices%22%3A%5B%5D%2C%22roles%22%3A%5B%5D%2C%22leadership_levels%22%3A%5B%5D%2C%22saved_jobs%22%3A%5B%5D%2C%22saved_searches%22%3A%5B%5D%2C%22sub_teams%22%3A%5B%5D%2C%22teams%22%3A%5B%5D%2C%22is_leadership%22%3Afalse%2C%22is_remote_only%22%3Afalse%2C%22sort_by_new%22%3Atrue%2C%22page%22%3A1%2C%22results_per_page%22%3Anull%7D%7D&server_timestamps=true&doc_id=9114524511922157';

	try {
		const response = await axios.post(url, body, {
			headers: headers,
		});

		const data = response.data; // Response data in JSON (object)

		// Convert the object to a JSON string
		const jsonString = JSON.stringify(data, null, 2); // Pretty-printed JSON

		// Write the JSON string to a file
		const fileName = `meta.json`;
		fs.writeFileSync(fileName, jsonString, 'utf8');
		console.log(`File saved: ${fileName}`);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

fetchMetaJobs();
