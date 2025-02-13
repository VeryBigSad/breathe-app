import { MONTHS } from '@/lib/api';
import MonthPageClient from '@/components/MonthPageClient';

export function generateStaticParams() {
    return MONTHS.map((month) => ({
        month: month.slug,
    }));
}

export default function MonthPage({ params }: { params: { month: string } }) {
    return <MonthPageClient params={params} />;
} 