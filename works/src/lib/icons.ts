import {
	siKotlin, siTypescript, siJavascript, siPython, siGo, siRust, siClojure, siOpenjdk, siPhp, siFsharp,
	siSpringboot, siDotnet, siVuedotjs, siReact, siAngular, siNextdotjs, siLit, siLaravel, siFastapi,
	siGooglecloud,
	siPostgresql, siMysql, siRedis, siElasticsearch,
	siDocker, siKubernetes, siHelm, siArgo,
	siJenkins, siBuildkite, siGithubactions, siGocd,
	siHuggingface, siScala, siDart,
} from 'simple-icons';

export type SimpleIcon = { path?: string; hex: string; title: string };

const iconMap: Record<string, SimpleIcon> = {
	Kotlin: siKotlin,
	Java: siOpenjdk,
	TypeScript: siTypescript,
	JavaScript: siJavascript,
	Python: siPython,
	Go: siGo,
	Rust: siRust,
	Clojure: siClojure,
	'F#': siFsharp,
	PHP: siPhp,
	'Spring Boot': siSpringboot,
	'.NET': siDotnet,
	'Vue.js': siVuedotjs,
	React: siReact,
	Angular: siAngular,
	AngularDart: siAngular, // no dedicated AngularDart glyph; use Angular mark
	'Next.js': siNextdotjs,
	lit: siLit,
	Laravel: siLaravel,
	FastAPI: siFastapi,
	GCP: siGooglecloud,
	// simple-icons に AWS グリフなし。色のみ（Amazon オレンジ）
	AWS: { title: 'AWS', hex: 'FF9900' },
	'GitHub Actions': siGithubactions,
	Scala: siScala,
	Dart: siDart,
	PostgreSQL: siPostgresql,
	MySQL: siMysql,
	Redis: siRedis,
	Elasticsearch: siElasticsearch,
	Docker: siDocker,
	Kubernetes: siKubernetes,
	Helm: siHelm,
	Argo: siArgo,
	Jenkins: siJenkins,
	Buildkite: siBuildkite,
	GoCD: siGocd,
	SentenceTransformer: siHuggingface,
};

export const getIcon = (name: string): SimpleIcon | undefined => iconMap[name];

/** WCAG relative luminance of a 6-digit hex (with or without #). */
export const brandRelativeLuminance = (hex: string): number => {
	const h = hex.replace('#', '');
	const channels = [0, 2, 4].map((i) => {
		const c = parseInt(h.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

/** Yellow / light cyan / other bright brand marks that need darker text + thinner wash. */
export const isLightBrand = (hex: string): boolean => brandRelativeLuminance(hex) >= 0.4;
