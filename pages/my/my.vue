<template>
    <view class="my-box">
        <!-- 内容 -->
        <view v-if="token" class="my-userinfo-contatiner">
            <!-- 头像区域 -->
            <view class="top-box">
                <image :src="userinfo.avatarUrl" class="avatar"></image>
                <view class="nickname">{{ userinfo.nickName }}</view>
            </view>
            <view class="panel-list">
                <!-- 面板1区域 -->
                <view class="panel">
                    <view class="panel-body">
                        <view class="panel-item" @click="gotoGoodsList">
                            <text>{{ collection.length }}</text>
                            <text>我的收藏</text>
                        </view>
                        <view class="panel-item" @click="gotoOrderList">
                            <text>{{ orderCount }}</text>
                            <text>订单查看</text>
                        </view>
                        <view class="panel-item" @click="gotoWithdrawOrderList">
                            <text>{{ withdrawOrderCount }}</text>
                            <text>订单回退</text>
                        </view>
                    </view>
                </view>
                <!-- 面板2区域 -->
                <view class="panel">
                    <u-cell-group>
                        <u-cell icon="setting-fill" title="个人设置"></u-cell>
                        <u-cell icon="question-circle" title="问题反馈"></u-cell>
                        <u-cell icon="account" title="退出登录" @click="outLogin"></u-cell>
                    </u-cell-group>
                </view>
            </view>
        </view>

        <!-- 未登录提示 -->
        <u-empty
            text="请进行登录!"
            mode="news"
            icon="http://cdn.uviewui.com/uview/empty/news.png"
            v-if="!token"
        ></u-empty>

        <!-- 未登录 -->
        <view class="login" v-if="!token">
            <u-button text="注册" @click="gotoRegister" type="warning" size="large"></u-button>
            <u-button text="登录" @click="gotoLogin" type="success" size="large"></u-button>
        </view>
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import badgeMix from '@/mixins/tabbar-badge.js';
import {orderCount, withdrawalOrderCount} from '@/util/api.js';
export default {
    mixins: [badgeMix],
    data() {
        return {
            orderCount: 0,
            withdrawOrderCount: 0,
        };
    },
    computed: {
        ...mapState('m_user', ['token', 'userinfo', 'collection']),
    },
    methods: {
        ...mapMutations('m_user', ['updateToken']),
        gotoRegister() {
            uni.navigateTo({
                url: '/subpkg/register/register',
            });
        },
        gotoLogin() {
            uni.navigateTo({
                url: '/subpkg/login/login',
            });
        },
        gotoGoodsList() {
            uni.navigateTo({
                url: '../../subpkg/goods_list/goods_list',
            });
        },
        gotoOrderList() {
            uni.navigateTo({
                url: '../../subpkg/order_list/order_list?withdraw=0',
            });
        },
        gotoWithdrawOrderList() {
            uni.navigateTo({
                url: '../../subpkg/order_list/order_list?withdraw=1',
            });
        },
        async loadOrderCount() {
            if (!this.token) return;
            let res = await orderCount();
            this.orderCount = res.count;
            let res2 = await withdrawalOrderCount();
            this.withdrawOrderCount = res2.count;
        },
        outLogin() {
            this.updateToken('');
            uni.$showMsg('退出成功');
        },
    },
    onShow() {
        this.loadOrderCount();
    },
};
</script>

<style lang="scss">
.my-box {
    .my-userinfo-contatiner {
        height: 100%;
        background-color: #f4f4f4;

        .top-box {
            height: 400rpx;
            background: linear-gradient(#e1251b, #e1251b, #e1251b, #f4f4f4);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .avatar {
                display: block;
                width: 90px;
                height: 90px;
                border-radius: 45px;
                border: 2px solid white;
                box-shadow: 0 1px 5px black;
            }

            .nickname {
                color: white;
                font-weight: bold;
                font-size: 16px;
                margin-top: 10px;
            }
        }

        .panel-list {
            padding: 0 10px;
            position: relative;
            top: -10px;

            .panel {
                background-color: white;
                border-radius: 3px;
                margin-bottom: 8px;

                .panel-body {
                    display: flex;
                    justify-content: space-around;

                    .panel-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-around;
                        font-size: 13px;
                        padding: 10px 0;
                    }
                }
            }
        }
    }

    .login {
        position: fixed;
        bottom: -2px;
        z-index: 999;
        width: 100%;

        display: flex;
        justify-content: start;
    }
}
</style>
