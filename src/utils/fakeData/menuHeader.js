import logoCompany from '../../assets/images/logo-company.png';
import { routers } from '../../routers';
const HeaderMenu = [
    {
        id: 1,
        name: 'Trang chủ',
        link: routers.home,
    },
    {
        id: 2,
        name: 'Về chúng tôi',
        children: [
            {
                id: '2.1',
                name: 'Giới thiệu',
                link: routers.introduce,
            },
            {
                id: '2.2',
                name: 'Báo cáo tài chính',
                link: routers.financialReport,
            },
        ],
    },
    {
        id: 3,
        name: 'Đào tạo',
        link: routers.training,
    },
    {
        id: 4,
        logoCompany: logoCompany,
        link: routers.home,
    },
    {
        id: 5,
        name: 'Sản phẩm - Dịch vụ',
        children: [
            {
                id: '5.1',
                name: 'Web',
                link: routers.web,
            },
            {
                id: '5.2',
                name: 'Dịch vụ cung cấp phần mềm',
                link: routers.softwareDeliveryService,
            },
            {
                id: '5.3',
                name: 'Quỹ tiết kiệm',
                link: routers.providentFund,
                children: [
                    {
                        id: '5.3.1',
                        name: 'Trang chủ',
                        link: `${routers.providentFund}/${routers.providentFundHome}`,
                    },
                    {
                        id: '5.3.3',
                        name: 'Nạp tiền',
                        link: `${routers.providentFund}/${routers.deposits}`,
                    },
                    {
                        id: '5.3.3',
                        name: 'Rút tiền',
                        link: `${routers.providentFund}/${routers.withdraws}`,
                    },
                    {
                        id: '5.3.4',
                        name: 'Giao dịch',
                        link: `${routers.providentFund}/${routers.transactions}`,
                    },
                    {
                        id: '5.3.4',
                        name: 'Tài khoản',
                        link: `${routers.providentFund}/${routers.profile}`,
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        name: 'Tuyển dụng',
        link: routers.recruitment,
    },
    {
        id: 7,
        name: 'Liên hệ',
        link: routers.contact,
    },
];
export default HeaderMenu;
