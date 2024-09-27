const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); // File system module

async function fetchGoogleCareers() {
	let pageNumber = 1; // Start from page 1
	let hasMorePages = true; // Flag to control the loop

	while (hasMorePages) {
		const url = `https://www.google.com/about/careers/applications/jobs/results?sort_by=date&page=${pageNumber}`;

		try {
			// Fetch the content from the URL
			const response = await axios.get(url);

			// Extract the HTML content from the response
			const htmlContent = response.data;

			// Load the HTML content into cheerio for parsing
			const $ = cheerio.load(htmlContent);

			// Count the number of <h3 class="QJPWVe"> elements
			const elementCount = $('h3.QJPWVe').length;

			console.log(`Page ${pageNumber} has ${elementCount} <h3> elements`);

			// Save the page source to a file with the format google_pageNumber.html
			const fileName = `google_${pageNumber}.html`;
			fs.writeFileSync(fileName, $.html(), 'utf8');
			console.log(`File saved: ${fileName}`);

			// If the element count is less than 20, stop the loop
			if (elementCount < 20) {
				console.log(
					`Stopping at page ${pageNumber} because it has less than 20 <h3> elements`
				);
				hasMorePages = false;
			}

			// Increment the page number for the next iteration
			pageNumber++;
		} catch (error) {
			console.error(`Error fetching page ${pageNumber}:`, error);
			hasMorePages = false; // Stop if an error occurs
		}
	}
}

fetchGoogleCareers();
