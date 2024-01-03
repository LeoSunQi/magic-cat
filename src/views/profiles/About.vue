<template>
  <div>
    <div class="banner">
      <logo alt="logo" size="100" />
    </div>
    <section v-for="l in list" :key="l.id">
      <van-divider content-position="left" class="d-title">{{
        l.title
      }}</van-divider>
      <ul class="d-content">
        <li v-for="item in l.content" :key="item">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Logo } from '@/components'
const list = [
  {
    id: 1,
    title: '什么是魔力？',
    content: [
      '魔力猫是由区块链技术创造出来的虚拟宠物。所有的魔力猫都被记录在公开透明的区块链上，TA们是独一无二的，一旦被你拥有，就无法被任何人复制、修改或销毁。你的魔力猫形象由多种基因随机组合而成，每种基因都会有【稀有】和【普通】两种属性。魔力猫含有稀有基因的数量和类型将决定TA的等级，你的魔力猫可能是【传奇】、【史诗】、【卓越】、【罕见】、【稀有】、【普通】中的任何一个等级。',
    ],
  },
  {
    id: 2,
    title: '魔力怎么玩？',
    content: [
      '你可以在猫猫集市，通过数字积分——猫币，购买你心仪的猫猫。你也能在繁育市场，选中一只喜欢的猫猫，向它支付其标记的繁育价格，就能得到与之繁育生出的猫猫。一旦繁育后，繁育双方都将进入“休息中”状态，休息中的猫猫不可进行繁育，可进行买卖。猫猫出生需要一定时间，繁育时间的长短取决于父母双方的休息时长。在我的猫窝中，除了查看并出售自己的猫猫，你还能将自己的猫猫挂出繁育，等待他人向你支付猫币进行繁育。',
    ],
  },
  {
    id: 3,
    title: '相关规则说明',
    content: [
      '01.由于每笔买卖、繁育交易都会被记录在区块链，期间需消耗一定的区块链算力资源。因此，当你进行购买或繁育交易时，或发布出售或发布繁育交易成功后，均需要交纳一定的手续费。手续费按交易价格的10%额外收取，100猫币封顶。',
      '02.当你在购买或进行繁育交易时，你的猫币余额必须大于【猫猫出售价格或繁育价格与手续费之和】，才能成功发起购买或繁育。待交易成功后，可在我的订单中查看交易详情。',
      '03.当你看中一只魔力猫、提交购买或繁育订单后，由于需要写入区块链，将需要一段交易确认时间，交易结果可在我的订单中查看。',
      '04.为了更好地维持猫猫集市的秩序，一定时间内未成交的魔力猫，有可能被系统取消卖出。',
      '05.休息时间是指猫猫繁育后需要休息的时间。休息时间为0分钟，表示猫猫未曾繁育，可以马上繁育。繁育次数越多，猫猫代数越大，休息时间会越长。',
      '06.繁育时间是新猫猫出生所需要的时间，繁育时间的长短取决于父母双方的休息时间的长短。繁育时间结束后，新出生的猫猫才会在“我的猫窝”与你见面。',
    ],
  },
  {
    id: 4,
    title: '魔力免责声明',
    content: [
      '请勿利用魔力猫相关服务进行融资或从事魔力猫、积分与法定货币、“虚拟货币”相互之间的兑换业务，不得买卖积分，不得为魔力猫、积分提供定价、信息中介服务，不得从事法律法规、监管政策禁止的任何活动。由于使用未经授权的第三方插件、脚本登录和使用本服务而造成您账户、魔力猫、猫币的损失，魔力猫团队不承担任何责任。',
    ],
  },
]
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 200px;
  background-color: $l-gray-2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d-title {
  font-size: $l-fz-title-md;
  color: $l-gray-8;
  font-weight: $l-fw-bold;
}
.d-content {
  box-sizing: border-box;
  padding: $l-spacing-md $l-spacing-xxl;
  color: $l-gray-5;
  line-height: $l-lh-md;
  li {
    margin-bottom: $l-spacing-md;
  }
}
</style>
