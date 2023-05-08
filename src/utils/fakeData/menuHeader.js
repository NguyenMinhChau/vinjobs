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
		name: 'Đào tạo',
		link: routers.training,
	},
	{
		id: 3,
		logoCompany: logoCompany,
		link: routers.home,
	},
	{
		id: 4,
		name: 'Tuyển dụng',
		link: routers.recruitment,
	},
	{
		id: 5,
		name: 'Liên hệ',
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
