import { ColumnsType } from 'antd/es/table';
import { Status, statusLabels } from '../../types/Models';

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
};

const compareTimestamps = (a: string, b: string) => {
    const timestampA = new Date(a).getTime();
    const timestampB = new Date(b).getTime();
    return timestampA - timestampB;
};

export const StatusColDef = (dataIndex) => ({
    title: 'Status',
    dataIndex,
    key: 'id',
    render: (status: Status) => statusLabels[status],
    filters: [
        {
            text: 'Joined',
            value: Status.JOINED.toString(),
        },
        {
            text: 'Submitted',
            value: Status.SUBMITTED.toString(),
        },
    ],
    onFilter: (value, record) => {
        return record.status == value;
    },
});

export const candidateColumn: ColumnsType<any> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'id',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Email',
        dataIndex: 'emailId',
        key: 'id',
    },
    {
        title: 'Language',
        dataIndex: ['assessment'],
        key: 'id',
        filters: [
            {
                text: 'JavaScript',
                value: 'Javascript',
            },
            {
                text: 'Python',
                value: 'Python',
            },
            {
                text: 'Java',
                value: 'Java',
            },
            {
                text: 'C++',
                value: 'C++',
            },
            {
                text: 'C',
                value: 'C',
            },
        ],
        onFilter: (value, record) => {
            return record.assessment.find((item) => item.language === value);
        },
        render: (text, record) => {
            return record.assessment.map((item) => <div key={item.id}>{item.language}</div>);
        },
    },
    StatusColDef(['assessment', 0, 'status']),
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'id',
        render: (timestamp: string) => formatTimestamp(timestamp),
        sorter: (a, b) => compareTimestamps(formatTimestamp(a.created_at), formatTimestamp(b.created_at)),
    },
];
