<template>
    <div>
        <div v-for="(tag,index) in item.goodsSkusCardValue" :key="index">
            {{tag.text}}
           
        </div>
    </div>
</template>

<script setup>
import { initSkusCardItem } from '~/composables/useSku';

const props = defineProps({
    skuCardId: [Number, String]
})


const { item } = initSkusCardItem(props.skuCardId)
console.log("1111:",item)


</script>