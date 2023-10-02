import { getBoardById } from '@/data/boardApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/components/LivePage.module.scss';
import LivePage from '@/components/EditPannel/LivePage';

export default function Page() {
    const router = useRouter();
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        (async () => {
            const _pageData = await getBoardById(router.query.id);
            if (_pageData) setPageData(_pageData);
        })();
    }, [router.query.id]);

    return pageData && <LivePage title={pageData.title} content={pageData.value} />;
}
