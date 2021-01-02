<template>
    <div id="menuContainer">
        <div v-for="(menu,index) in menus" :key="index" >
            <div v-if="((!menu.authRequired || isLoggedIn || !authenticationEnabled) && menu.display && !menu.hideAfterAuth ) || (!isLoggedIn && menu.hideAfterAuth)">
                <div v-if="!menu.externalLink">
                    <router-link tag="div" :to="menu.link">
                        <div class="menu-text pointer"
                             :class="setClassesOnMenu(menu.name,index,menus.length)">
                            <span
                                title="Restricted Access"
                                v-b-tooltip.hover
                                v-if="menu.rbacRequired && displayRestricted(menu.name)">
                                <b-icon-lock-fill
                                    variant="success"
                                ></b-icon-lock-fill>
                            </span>
                            {{menu.headerText}}
                        </div>
                    </router-link>
                    <template v-if="menu.name === activeMenu">
                        <router-link tag="div" :to="item.link" v-for="(item,index) in menu.items" :key="index">
                            <div class="sub-menu-text pointer"
                                 :class="setClassesOnSubMenu(item.name,index,menu.items.length)"
                                 v-if="item.display">
                                {{item.title}}
                            </div>
                        </router-link>
                    </template>
                </div>
                <div v-else>
                    <div class="menu-text pointer"
                         :class="setClassesOnMenu(menu.name,index,menus.length)"
                         @click="goToLink(menu.link)">
                        {{menu.headerText}}
                    </div>
                    <template v-if="menu.name === activeMenu">
                        <div class="sub-menu-text pointer"
                             :class="setClassesOnSubMenu(item.name,index,menu.items.length)"
                             v-for="(item,index) in menu.items" :key="index"
                             @click="goToLink(item.link)">
                            {{item.title}}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {appConfig} from "@/main";

export default {
    data(){
        return {
            hoverMenuText: null,
            hoverMenuSubText: null
        }
    },
    computed: {
        ...mapGetters([
            'activeMenu',
            'activeContent',
            'menus',
            'isLoggedIn',
            'pinMenu',
            'authenticationEnabled'
        ])
    },
    methods: {
        setClassesOnMenu(name,index,arrayLength){
            return {
                'active': this.activeMenu === name,
                'menu-bottom-border': index !== arrayLength - 1
            }
        },
        setClassesOnSubMenu(name,index,arrayLength){
            return {
                'active': this.activeContent === name,
                'sub-menu-bottom-border': index !== arrayLength - 1
            }
        },
        goToLink(_link){
            window.open(_link,'_blank');
        },
        displayRestricted(_name){
            if(_name === 'admin' && appConfig.RBAC_ROLE_ADMIN_VIEW){
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>

<style scoped>

#menuContainer {
    padding: 0 5px;
}

</style>
