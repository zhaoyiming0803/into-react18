interface Pagination {
  page: number;
  pageSize: number;
  desc?: boolean;
  sort?: string;
  total?: number;
}

export interface LocalBusinessListData {
  shopName: string;
  areaId: number;
  pagination: Pagination;
}

export interface LocalPartnerAreaData {
  partnerId: number;
}

export interface BusinessForm {
  shopName: string; // 店铺名称
  briefImage: string; // 缩略图
  bannerList: string[]; // 商品主图list
  stars: number; // 评分 0.0 -5.0
  shopTel: string; // 店铺电话
  address: string; // 店铺位置
  category1: number; // 一级类目id
  category2: number; // 二级类目id
  areaId: number; // 商圈id
  status: number; // 状态
  weight: number; // 权重
  openingHours: string; // 营业时间
  ownerName: string; // 店铺所有者姓名
  ownerBankName: string; // 店铺所有者银行开户行
  ownerBankAccount: string; // 店铺所有者银行账号
  lat: number; // 纬度
  lon: number; // 经度
}

export interface LocalAreasListData {
  partnerId: number;
}

export interface LocalAreaForm {
  areaId: number | string;
  name: string;
  partnerId: number | string;
}

export interface DelLocalAreaData {
  areaId: number | string;
}
