import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';

export const ProductPage = () => {
    return (
        <main className="px-5">
            <ResponsiveUserAuthNav home="/dashboard" />
            <Catalog catalogName="Manage Products">

            </Catalog>
            
        </main>
    );
};

