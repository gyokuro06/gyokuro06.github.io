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
