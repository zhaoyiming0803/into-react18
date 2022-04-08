/**
 * 当前文件只用于测试 React 16 相关功能和特性
 */
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CouponForm } from "@/types/index";
import CouponItem from "@/components/CouponItem";

interface Props {}

const couponForm: CouponForm = {
  title: "",
  couponType: 2,
  explains: "", // 优惠券说明
  status: 1, // 上下线状态 1 上线 2 下线
  startPrice: 1, // 最低使用金额
  originPrice: 2, // 优惠券原始金额
  couponPrice: 3, // 优惠券销售金额
  businessPrice: 4, // 优惠券结算金额
  platformAddPrice: 5, // 平台加价
  total: 6,
  gotCount: 7, // 已领取数量
  dailySellLimit: 8, // 每日销售限制
  maxLimit: 9, // 单人最大购买数
  startTime: "",
  endTime: "",
  onlineTime: "",
  offlineTime: "",
  weight: 10, // 排序
  usageRule: "", // 使用规则
  usageBookingInfo: "", // 预约说明
  usageTip: "", // 温馨提示
  usageBusinessService: "", // 商家服务
  shareText: "", // 优惠券分享文案
  distribution: 11, // 是否分销 0取消分销 1开启分销
  distributionAmount: 12, // 分销金额(元)
  imageIcon: "", // 图片
  images: [""],
  detailImages: [""], // 套餐图片
  detailText: "", // 套餐文字说明
  schemeContents: [""],
  shopNewOnly: 1, // 店铺新客专享
  specialScheme: 2, // 今日爆品
  qualitySelection: 3, // 优质精选
  bigRecommendation: 4, // 大牌推荐
  refund: 5, // 可退款
}

function Coupon<T extends Props>(props: T) {
  const history = useHistory();
  console.log("history: ", history);

  const [coupon, setCoupon] = useState(couponForm);
  const [count, setCount] = useState(0);


  // useCallback(() => {
  //   setTimeout(() => {
  //     setCount(count + 1)
  //     setCoupon({
  //       ...coupon,
  //       title: count + "",
  //     })
  //   }, 2000)
  // }, [])

  const addCountMultiple = () => {
    for (let i = 1; i <= 3; i++) {
      setCount(count + i)
    }
    // 并不能立刻获取到最新值，React 会自动批处理，页面中展示的值是 count + 3
    console.log('addCountMultiple: ', count)
  }

  const addCountMultipleInSetTimeout = () => {
    setTimeout(() => {
      for (let i = 1; i <= 3; i++) {
        setCount(count + i)
      }
      // 并不能立刻获取到最新值，React 会自动批处理，页面中展示的值是 count + 3
      console.log('addCountMultipleInSetTimeout: ', count)
    })
  }

  useEffect(() => {
    // 在受控环境中，count 变化后只执行一次，说明 setCount 是自动合并批处理的
    // 在非受控环境中，count 会多次变化，不会自动批处理，并且 3 次打印不连续，说明 React 内部有机制调度排列所有任务的优先级
    console.log('useEffect count: ', count)
  }, [count])

  console.log("coupon render");

  return (
    <div>
      <h1>Coupon page</h1>
      <div>{history.location.search}</div>
      <CouponItem coupon={coupon} />
      <div>------------------------------------------------------</div>
      <div>count: {count}</div>
      <button onClick={addCountMultiple}>click to change count</button>
      <button onClick={addCountMultipleInSetTimeout}>click to change count in setTimeout</button>
    </div>
  )
}

export default Coupon