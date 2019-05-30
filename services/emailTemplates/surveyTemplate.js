module.exports = (survey) => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input!</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${process.env.redirectURL}/api/surveys/thanks">yes</a>
						<a href="${process.env.redirectURL}/api/surveys/thanks">no</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
