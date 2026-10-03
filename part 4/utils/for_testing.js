import logger from "./logger.js"

const reverse=(str)=>{
   return str.split('').reverse().join('')
}

// logger.info(reverse("mera wathan thuj pa kuch b qurban na kardo, punjabio ka wathan"))

const average=(...array)=>{
    return array.reduce((a,b)=> a+b,0)/array.length
}

// logger.info(average(1,2,3,4,5))q

export default {reverse, average}