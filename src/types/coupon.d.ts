export interface CouponForm {
  couponType: number; // 2 代金券 3 优惠券
  title: string; // 优惠券标题
  explains: string; // 优惠券说明
  status: number; // 上下线状态 1 上线 2 下线
  startPrice: number; // 最低使用金额
  originPrice: number; // 优惠券原始金额
  couponPrice: number; // 优惠券销售金额
  businessPrice: number; // 优惠券结算金额
  platformAddPrice: number; // 平台加价
  total: number;
  gotCount: number; // 已领取数量
  dailySellLimit: number; // 每日销售限制
  maxLimit: number; // 单人最大购买数
  startTime: string;
  endTime: string;
  onlineTime: string;
  offlineTime: string;
  weight: number; // 排序
  usageRule: string; // 使用规则
  usageBookingInfo: string; // 预约说明
  usageTip: string; // 温馨提示
  usageBusinessService: string; // 商家服务
  shareText: string; // 优惠券分享文案
  distribution: number; // 是否分销 0取消分销 1开启分销
  distributionAmount: number; // 分销金额(元)
  imageIcon: string; // 图片
  images: string[];
  detailImages: string[]; // 套餐图片
  detailText: string; // 套餐文字说明
  schemeContents: any[];
  shopNewOnly: number; // 店铺新客专享
  specialScheme: number; // 今日爆品
  qualitySelection: number; // 优质精选
  bigRecommendation: number; // 大牌推荐
  refund: number; // 可退款
}
