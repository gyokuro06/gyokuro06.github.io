import type { Company, Project, YearMonth } from '../data/works';

/** Convert YYYY.MM to months since year 0 for arithmetic. */
export function yearMonthToIndex(ym: YearMonth): number {
	const [y, m] = ym.split('.').map(Number);
	return y * 12 + (m - 1);
}

export function formatYearMonth(ym: YearMonth): string {
	return ym;
}

export function formatPeriod(start: YearMonth, end: YearMonth | null): string {
	if (end === null) return `${formatYearMonth(start)} 〜 現在`;
	return `${formatYearMonth(start)} 〜 ${formatYearMonth(end)}`;
}

/** “現在” = this calendar month (build-time). */
export function currentYearMonth(now = new Date()): YearMonth {
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, '0');
	return `${y}.${m}` as YearMonth;
}

export type CompanyLane = {
	id: string;
	name: string;
	start: YearMonth;
	end: YearMonth | null;
	/** CSS left % of the band within the global range */
	leftPct: number;
	/** CSS width % of the band */
	widthPct: number;
	periodLabel: string;
};

export type TimelineModel = {
	rangeStart: YearMonth;
	rangeEnd: YearMonth;
	/** Axis tick labels (year starts that fall in range, plus ends) */
	ticks: { label: string; pct: number }[];
	lanes: CompanyLane[];
};

function endIndex(end: YearMonth | null, present: YearMonth): number {
	return yearMonthToIndex(end ?? present);
}

/**
 * Build company lanes: one per company, span = min(start)–max(end) of its projects.
 * Vertical order: max(end) newest first; ties by name.
 */
export function buildCompanyTimeline(
	companies: Company[],
	projects: Project[],
	now = new Date(),
): TimelineModel {
	const present = currentYearMonth(now);
	const byId = new Map(companies.map((c) => [c.id, c]));

	type Acc = { id: string; name: string; start: YearMonth; end: YearMonth | null };
	const acc = new Map<string, Acc>();

	for (const p of projects) {
		const company = byId.get(p.companyId);
		if (!company) continue;
		const existing = acc.get(p.companyId);
		if (!existing) {
			acc.set(p.companyId, {
				id: company.id,
				name: company.name,
				start: p.start,
				end: p.end,
			});
			continue;
		}
		if (yearMonthToIndex(p.start) < yearMonthToIndex(existing.start)) {
			existing.start = p.start;
		}
		const prevEnd = endIndex(existing.end, present);
		const nextEnd = endIndex(p.end, present);
		if (nextEnd > prevEnd || (p.end === null && existing.end !== null)) {
			existing.end = p.end;
		}
	}

	const rawLanes = [...acc.values()].sort((a, b) => {
		const endDiff = endIndex(b.end, present) - endIndex(a.end, present);
		if (endDiff !== 0) return endDiff;
		return a.name.localeCompare(b.name, 'ja');
	});

	const allStarts = rawLanes.map((l) => yearMonthToIndex(l.start));
	const allEnds = rawLanes.map((l) => endIndex(l.end, present));
	const minIdx = Math.min(...allStarts);
	const maxIdx = Math.max(...allEnds);
	/* 両端の月を含む（1ヶ月だけの帯も幅が消えない） */
	const span = Math.max(maxIdx - minIdx + 1, 1);

	const rangeStart = indexToYearMonth(minIdx);
	const rangeEnd = indexToYearMonth(maxIdx);

	const lanes: CompanyLane[] = rawLanes.map((l) => {
		const startIdx = yearMonthToIndex(l.start);
		const endIdx = endIndex(l.end, present);
		const months = Math.max(endIdx - startIdx + 1, 1);
		const leftPct = ((startIdx - minIdx) / span) * 100;
		const widthPct = (months / span) * 100;
		return {
			...l,
			leftPct,
			widthPct,
			periodLabel: formatPeriod(l.start, l.end),
		};
	});

	const ticks = buildYearTicks(minIdx, maxIdx, span);

	return { rangeStart, rangeEnd, ticks, lanes };
}

function indexToYearMonth(idx: number): YearMonth {
	const y = Math.floor(idx / 12);
	const m = String((idx % 12) + 1).padStart(2, '0');
	return `${y}.${m}` as YearMonth;
}

function buildYearTicks(minIdx: number, maxIdx: number, span: number): { label: string; pct: number }[] {
	const startYear = Math.floor(minIdx / 12);
	const endYear = Math.floor(maxIdx / 12);
	const ticks: { label: string; pct: number }[] = [];
	for (let y = startYear; y <= endYear; y++) {
		const jan = y * 12;
		if (jan < minIdx || jan > maxIdx) {
			if (y === startYear) {
				ticks.push({ label: String(y), pct: 0 });
			}
			continue;
		}
		ticks.push({ label: String(y), pct: ((jan - minIdx) / span) * 100 });
	}
	return ticks;
}

export function companyNameById(companies: Company[], id: string): string {
	return companies.find((c) => c.id === id)?.name ?? id;
}
