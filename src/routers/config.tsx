/*
* @Description: 路由所需函数
* @Author: liuyuan
* @Date: 2022-04-19
 * @LastEditTime: 2023-01-31 11:00:39
 * @LastEditors: chenghao
* @version: 1.0
*/

import React, { lazy } from 'react';
import LayoutNav from 'src/layouts';
import SinglePointContract from 'src/pages/contract-creation/singlePoint-contract';
import ElectronicContractPublish from 'src/pages/standardtext/electronicContract-publish';
import ContractBill from 'src/pages/contract-performance/contract-bill/home';
import ContractRemind from 'src/pages/contract-performance/contract-remind';
import PerformingConfirm from 'src/pages/contract-performance/performing-confirm';

import GeneralApproval from 'src/pages/contract-process/general-approval';
import SpecialApproval from 'src/pages/contract-process/special-approval';
//合同履行综合查询
import ContractSyntheticSearch from 'src/pages/contract-performance/contract-synthetic-search';
import ContractIctConfirm from 'src/pages/contract-performance/contract-ict-confirm';
import ContractSigningSheet from 'src/pages/contractSigning-Center/contract-signing-sheet'; //签约中心审签单
import Stamptax from 'src/pages/contract-financial/stamptax';
import ContractSigningCenterRouter from 'src/pages/contractSigning-Center';
// import ComprehensiveInquiryRouter from 'src/pages/comprehensive-inquiry';
import BatchApproveContract from 'src/pages/contract-creation/batch-approve/new'; //新建成批审批合同
import AdditionalContract from 'src/pages/contract-creation/through-the-contract'; //补录合同起草
import SecretContract from 'src/pages/contract-creation/secret-contract'; //涉密合同起草
import Widhholding from 'src/pages/contract-financial/withholding';
import PerformanceEvaluateReport from 'src/pages/evaluate/performance-evaluate-report' // 单个合同
import HistoricalContract from 'src/pages/contract-creation/historical-contract'; //历史合同补录
import BlackListDetail from 'src/pages/comprehensive-inquiry/black-list-detail';
import ContractSecretDetail from 'src/pages/comprehensive-inquiry/contract-secret/component/index';
// 预提单起草 在菜单中，需要单独创建路由
import WithholdingFormDraft from 'src/pages/contract-financial/withholdingForm-draft';
import SingleStandardList from 'src/pages/comprehensive-inquiry/single-contract-sign/standard-text';
import SingleDatailList from 'src/pages/comprehensive-inquiry/single-contract-sign/detail-list';
import ContracDetails from 'src/pages/comprehensive-inquiry/comprehensive-contract-query/component/contract-details'; //综合查询详情
import PrintPage from 'src/pages/comprehensive-inquiry/comprehensive-contract-query/component/print-page'; //综合查询打印
import ElectronicContracDetails
  from 'src/pages/comprehensive-inquiry/comprehensive-contract-query/component/electronic-contract-details'; //
import PlatformTextDetail from "src/pages/comprehensive-inquiry/platform-text-detail";
import AffiliatedfBinding from "src/pages/contractSigning-Center/affiliated-contract/affiliatedf-binding";
// 一点支付单页面路由
import OnePointPay from 'src/pages/contract-financial/onePointPay';
// 一点支付成本分摊新建
import OnePointPayCreate from 'src/pages/contract-financial/onePointPay-create';
// 一点支付成本分摊凭证详情
import OnePointPayVoucherDetail from 'src/pages/contract-financial/onePointPay-voucherQuery/voucherDetail';
// 二次分摊单页面路由 在菜单中，需要单独创建路由
import SecondaryShare from 'src/pages/contract-financial/secondaryShare';
// 二次分摊规则新建 在菜单中，需要单独创建路由
import SecondaryShareRuleCreate from 'src/pages/contract-financial/secondaryShareRule-create';
// 二次分摊凭证详情
import SecondaryShareRuleVoucherDetail from 'src/pages/contract-financial/secondaryShareRule-voucherQuery/voucherDetail';
// 集团利润上划
import GroupProfitIncrease from 'src/pages/contract-financial/groupProfitIncrease';
// 重大风险提示
import MajorRisksTip from 'src/pages/comprehensive-inquiry/abnormal-performance-info/major-risks-tip'
import SignFilePage from 'src/pages/contractSigning-Center/sign-file-page'

import { IRouteContent } from './types';

// 整体路由列表,根据路由规则,path长的需放在上方,请注意!!!!
/*
  {
    path: '/contractSigningCenter-single', // 路由
    component: ContractSigningCenterRouter, // 组件
    exact: false,
    noMenu: true // true没有菜单
  },
*/
export const routeList = [
  {
    path: '/comprehensive-inquirys/major-risks-tip',
    component: MajorRisksTip,
    exact: false,
  },
  {
    path: '/contractSigning-Center/sign-file-page',
    component: SignFilePage,
    exact: false
  },
  {
    path: '/comprehensive-inquirys/platform-text-detail',
    component: PlatformTextDetail,
    exact: false
  },
  {
    path: '/comprehensive-inquirys/electronic-contract-details',
    component: ElectronicContracDetails,
    exact: false
  },
  {
    path: '/comprehensive-inquirys/comprehensive-contract-details',
    component: ContracDetails,
    exact: false,
    noMenu: true
  },
  {
    path: '/comprehensive-inquirys/PrintPage',
    component: PrintPage,
    exact: false
  },
  {
    path: '/comprehensive-inquirys/contractSecrets-detail',
    component: ContractSecretDetail,
    exact: false
  },
  {
    path: '/comprehensive-inquirys/black-lists',
    component: BlackListDetail,
    exact: false
  },
  {
    path: '/withholding/withholdingForm-draft',
    component: WithholdingFormDraft,
    exact: false,
    noMenu: true
  },
  {
    path: '/comprehensive-inquiry/single-contract-sign/standard-text',
    component: SingleStandardList,
    exact: false
  },
  {
    path: '/comprehensive-inquiry/single-contract-sign/detail-list',
    component: SingleDatailList,
    exact: false
  },
  {
    path: `/performance-evaluate-report`,
    component: PerformanceEvaluateReport,
    exact: false
  },
  {
    path: '/historical-contract',
    component: HistoricalContract,
    exact: false
  },
  {
    path: `/contract-creation/through-the-contract/:readySealId/:isQuery`, // isQuery: false:非查询页面,true:查询页面,不可编辑
    component: AdditionalContract,
    exact: false
  },
  {
    path: '/contract-creation/batch-approve/new',
    component: BatchApproveContract,
    exact: false
  },
  {
    path: '/contract-creation/secret-contract',
    component: SecretContract,
    exact: false
  },
  {
    path: '/contractSigningCenter-single',
    component: ContractSigningCenterRouter,
    exact: false,
    noMenu: true
  },
  {
    path: '/contractSigningCenter-affiliatedf-binding',
    component: AffiliatedfBinding,
    exact: false,
    noMenu: true
  },
  {
    path: '/electronicContract-publish',
    component: ElectronicContractPublish,
    exact: false,
    noMenu: true
  },
  {
    path: '/contract-signing-sheet',
    component: ContractSigningSheet,
    exact: false,
  },
  {
    path: '/singlePoint-contract',
    component: SinglePointContract,
    exact: false
  },
  {
    path: '/contract-bill',
    component: ContractBill,
    exact: false,
    noMenu: true
  },
  {
    path: '/contract-remindTodo',
    component: ContractRemind,
    exact: false
  },
  {
    path: '/contract-remindRead',
    component: ContractRemind,
    exact: false,
    noMenu: true
  },
  {
    path: '/general-approval',
    component: GeneralApproval,
    exact: false,
    noMenu: true
  },
  {
    path: '/special-approval',
    component: SpecialApproval,
    exact: false,
    noMenu: true
  },
  {
    path: '/performing-confirm',
    component: PerformingConfirm,
    exact: false,
    noMenu: true
  },
  {
    path: '/contract-performance/contract-synthetic-search',
    component: ContractSyntheticSearch,
    exact: false
  },
  {
    path: '/contract-performance/contract-ict-confirm',
    component: ContractIctConfirm,
    exact: false
  },
  {
    path: '/onePointPay/create',
    component: OnePointPayCreate,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/onePointPay',
    component: OnePointPay,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/contract-financial/onePointPay-voucherDetail',
    component: OnePointPayVoucherDetail,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/secondaryShare/create',
    component: SecondaryShareRuleCreate,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/contract-financial/secondaryShareRule-voucherDetail',
    component: SecondaryShareRuleVoucherDetail,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/secondaryShare',
    component: SecondaryShare,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/groupProfitIncrease',
    component: GroupProfitIncrease,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/withholding',
    component: Widhholding,
    exact: false,
    noMenu: true // true没有菜单
  },
  {
    path: '/stamptax',
    component: Stamptax,
    exact: false,
    noMenu: true // true没有菜单
  },
  //管理驾驶舱的跳转--跳转的时候会特殊处理
  {
    path: '/cockpit',
    component: "",
    exact: false
  },
  {
    path: '/',
    component: LayoutNav,
    exact: false
  },
];

// 获取路由内数据
export const checkAuth = (routers: any, path: string) => {
  for (const data of routers) {
    if (data.path == path) return data;
    if (data.children) {
      const res: any = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};

// 整体路由打开新页签,返回菜单点击需要打开的新页签路径
export const newPageList = () => {
  let newPage: string[] = [];
  routeList.forEach((route) => {
    if (route.path !== '/') {
      newPage.push(route.path);
    }
  });
  return newPage;
};

/**
 * content使用路由
 * menuList 菜单列表
 * contentRouter 返回的菜单列表
 */
export const menuRouter = (menuList: IRouteContent[], contentRouter: IRouteContent[] = []) => {
  menuList.forEach((menuItem: IRouteContent) => {
    if (menuItem.children?.length > 0) {
      // 表示有子节点
      contentRouter.concat(menuRouter(menuItem.children as IRouteContent[], contentRouter));
    } else {
      // 没有子节点，表示最后一级
      // 排除根节点
      if (menuItem.menuUrl?.includes('/')) {
        // 首页不加载，确定好后修改
        // !newPageList().includes(menuItem.menuUrl) 表示单页面不用懒加载到layout-content路由中
        if (menuItem.menuUrl !== '/workbench/pending' && !newPageList().includes(menuItem.menuUrl)) {
          menuItem.component = lazy(() => import('src/pages' + menuItem.menuUrl));

          if (menuItem.menuUrl.startsWith('/configure-query/data-source-dynamic')) {
            menuItem.component = lazy(() => import('src/pages' + '/configure-query/data-source-dynamic'));
          } else {
            menuItem.component = lazy(() => import('src/pages' + menuItem.menuUrl));
          }

          contentRouter.push(menuItem);
        }
      }
    }
  });
  return contentRouter;
};
