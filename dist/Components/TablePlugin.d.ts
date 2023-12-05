import React from 'react';
/**
 * The `TablePlugin` component is a versatile table display component for rendering employee information.
 * It includes features like sorting, searching, pagination, and configurable entries per page.
 * @component
 * @returns {JSX.Element} The rendered `TablePlugin` component.
 */
interface TablePluginProps {
    headers: string[];
    data: string[][];
    showHeader?: boolean;
    showTableInfo?: boolean;
}
declare const TablePlugin: React.FC<TablePluginProps>;
export default TablePlugin;
