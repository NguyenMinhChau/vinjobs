import logoCompany from '../../assets/images/logo-company.png';
import { routers } from '../../routers';
const HeaderMenu = [
	{
		id: 1,
		name: 'Chúng tôi',
		link: routers.home,
	},
	{
		id: 2,
		name: 'Việc làm',
		link: routers.jobs,
	},
	{
		id: 3,
		logoCompany: logoCompany,
		link: routers.home,
	},
	{
		id: 4,
		name: 'Diễn đàn',
		link: routers.forum,
	},
	{
		id: 5,
		name: 'Liên hệ hợp tác',
		link: routers.contact,
	},
	// {
	//     id: 2,
	//     name: 'Về chúng tôi',
	//     children: [
	//         {
	//             id: '2.1',
	//             name: 'Giới thiệu',
	//             link: routers.introduce,
	//             children: [
	//                  {
	//                      id: '5.3.1',
	//                      name: 'Trang chủ',
	//                      link: `${routers.providentFund}/${routers.providentFundHome}`,
	//                  },
	//              ]
	//         },
	//     ],
	// },
];
export default HeaderMenu;
