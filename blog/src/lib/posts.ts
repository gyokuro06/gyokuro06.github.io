export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
		.format(date)
		.replaceAll('/', '.');
}

/** 本文Markdownの最初の段落からカード用の抜粋を作る */
export function extractExcerpt(body: string, maxLength = 150): string {
	const withoutCodeBlocks = body.replace(/```[\s\S]*?```/g, '');
	const paragraphs = withoutCodeBlocks
		.split(/\n{2,}/)
		.map((block) => block.trim())
		.filter(Boolean);

	const firstParagraph = paragraphs.find(
		(block) =>
			!/^#{1,6}\s/.test(block) &&
			!/^>\s*\[!\w+\]/.test(block) &&
			!/^[-*+]\s/.test(block),
	);

	if (!firstParagraph) return '';

	const plainText = firstParagraph
		.replace(/^>\s?/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[*_`~]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
}
