// mock 数据层 — 模拟后端接口
// 真实项目只需替换 api.js 中的请求函数即可

const FOODS_KEY = 'heartfelt_kitchen_foods'
const USER_KEY = 'heartfelt_kitchen_user'
const LIKES_KEY = 'heartfelt_kitchen_likes'
const FAVS_KEY = 'heartfelt_kitchen_favs'

// ---------- 初始数据 ----------
const initFoods = [
  {
    id: '1',
    title: '家常红烧肉',
    cover: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '硬菜',
    time: '60分钟',
    difficulty: '中等',
    likes: 328,
    favs: 156,
    desc: '软糯入味，肥而不腻，一口就爱上的家常红烧肉！',
    steps: [
      { text: '五花肉切块，冷水下锅焯水去腥，捞出沥干。', img: '' },
      { text: '锅中放少许油，下冰糖小火炒至枣红色。', img: '' },
      { text: '下肉块翻炒上色，加料酒、生抽、老抽。', img: '' },
      { text: '加开水没过肉块，放葱姜蒜、八角桂皮。', img: '' },
      { text: '大火烧开转小火炖1小时，收汁即可。', img: '' }
    ],
    tags: ['五花肉', '红烧', '家常菜'],
    createTime: Date.now() - 86400000 * 2
  },
  {
    id: '2',
    title: '番茄鸡蛋汤',
    cover: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '汤品',
    time: '15分钟',
    difficulty: '简单',
    likes: 256,
    favs: 98,
    desc: '酸甜开胃，营养丰富，厨房小白也能轻松搞定！',
    steps: [
      { text: '番茄切块，鸡蛋打散备用。', img: '' },
      { text: '锅中烧水，水开后下番茄煮出红汤。', img: '' },
      { text: '加少许盐和糖调味。', img: '' },
      { text: '淋入蛋液形成蛋花，轻轻搅动。', img: '' },
      { text: '出锅前撒葱花，淋少许香油。', img: '' }
    ],
    tags: ['番茄', '鸡蛋', '快手菜'],
    createTime: Date.now() - 86400000 * 5
  },
  {
    id: '3',
    title: '蒜蓉西兰花',
    cover: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '素菜',
    time: '10分钟',
    difficulty: '简单',
    likes: 189,
    favs: 67,
    desc: '翠绿爽口，蒜香浓郁，低脂健康首选！',
    steps: [
      { text: '西兰花切小朵，焯水1分钟捞出。', img: '' },
      { text: '蒜切末，调料汁：生抽+蚝油+少许盐糖。', img: '' },
      { text: '锅中热油，下蒜末炒香。', img: '' },
      { text: '倒入西兰花和调料汁快速翻炒均匀。', img: '' }
    ],
    tags: ['西兰花', '素菜', '健康'],
    createTime: Date.now() - 86400000 * 8
  },
  {
    id: '4',
    title: '可乐鸡翅',
    cover: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '硬菜',
    time: '30分钟',
    difficulty: '中等',
    likes: 445,
    favs: 231,
    desc: '甜香浓郁，外焦里嫩，小朋友的最爱！',
    steps: [
      { text: '鸡翅正反划两刀，冷水下锅焯水。', img: '' },
      { text: '锅中少许油，将鸡翅煎至两面金黄。', img: '' },
      { text: '倒入一罐可乐，加生抽、老抽。', img: '' },
      { text: '大火烧开转小火炖15分钟。', img: '' },
      { text: '大火收汁至浓稠，出锅撒白芝麻。', img: '' }
    ],
    tags: ['鸡翅', '可乐', '小朋友爱'],
    createTime: Date.now() - 86400000 * 1
  },
  {
    id: '5',
    title: '蛋炒饭',
    cover: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '主食',
    time: '10分钟',
    difficulty: '简单',
    likes: 512,
    favs: 312,
    desc: '粒粒分明，金黄诱人，剩米饭的完美逆袭！',
    steps: [
      { text: '准备隔夜冷米饭，打散备用。', img: '' },
      { text: '鸡蛋打散，炒成蛋碎盛出。', img: '' },
      { text: '锅中多放油，下米饭中大火翻炒。', img: '' },
      { text: '米饭炒散后加入蛋碎，加盐和葱花。', img: '' }
    ],
    tags: ['米饭', '快手', '经典'],
    createTime: Date.now() - 86400000 * 3
  },
  {
    id: '6',
    title: '酸辣土豆丝',
    cover: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&h=400&fit=crop',
    author: '厨房达人',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    tag: '素菜',
    time: '15分钟',
    difficulty: '简单',
    likes: 298,
    favs: 143,
    desc: '酸辣爽脆，开胃下饭，经典家常川味！',
    steps: [
      { text: '土豆切细丝，泡水去淀粉。', img: '' },
      { text: '锅中烧水，土豆丝焯水30秒捞出。', img: '' },
      { text: '油锅下干辣椒和花椒炒香。', img: '' },
      { text: '下土豆丝大火快炒，加醋和盐。', img: '' }
    ],
    tags: ['土豆', '川菜', '下饭'],
    createTime: Date.now() - 86400000 * 4
  }
]

const initUser = {
  id: 'user_1',
  nickname: '美食爱好者',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  bio: '爱吃爱做，热爱生活 🌈',
  fans: 128,
  follows: 56,
  likes: 892,
  foods: 12
}

// ---------- 工具函数 ----------
function getStorage(key, fallback) {
  try {
    const val = uni.getStorageSync(key)
    return val ? JSON.parse(val) : fallback
  } catch (e) {
    return fallback
  }
}

function setStorage(key, val) {
  uni.setStorageSync(key, JSON.stringify(val))
}

// ---------- API 函数 ----------
export function apiGetFoods() {
  let foods = getStorage(FOODS_KEY, null)
  if (!foods) {
    foods = initFoods
    setStorage(FOODS_KEY, foods)
  }
  return foods
}

export function apiGetFoodDetail(id) {
  const foods = apiGetFoods()
  return foods.find(f => f.id === id) || null
}

export function apiToggleLike(id) {
  const likes = getStorage(LIKES_KEY, {})
  const foods = apiGetFoods()
  const food = foods.find(f => f.id === id)
  if (!food) return false
  if (likes[id]) {
    delete likes[id]
    food.likes--
  } else {
    likes[id] = true
    food.likes++
  }
  setStorage(LIKES_KEY, likes)
  setStorage(FOODS_KEY, foods)
  return !!likes[id]
}

export function apiToggleFav(id) {
  const favs = getStorage(FAVS_KEY, {})
  const foods = apiGetFoods()
  const food = foods.find(f => f.id === id)
  if (!food) return false
  if (favs[id]) {
    delete favs[id]
    food.favs--
  } else {
    favs[id] = true
    food.favs++
  }
  setStorage(FAVS_KEY, favs)
  setStorage(FOODS_KEY, foods)
  return !!favs[id]
}

export function apiIsLiked(id) {
  return !!getStorage(LIKES_KEY, {})[id]
}

export function apiIsFaved(id) {
  return !!getStorage(FAVS_KEY, {})[id]
}

export function apiGetUser() {
  let user = getStorage(USER_KEY, null)
  if (!user) {
    user = initUser
    setStorage(USER_KEY, user)
  }
  return user
}

export function apiUpdateUser(data) {
  let user = apiGetUser()
  user = { ...user, ...data }
  setStorage(USER_KEY, user)
  return user
}

export function apiGetMyFavs() {
  const favs = getStorage(FAVS_KEY, {})
  return apiGetFoods().filter(f => favs[f.id])
}

export function apiGetMyFoods() {
  return apiGetFoods().filter(f => f.author === apiGetUser().nickname)
}

export function apiAddFood(data) {
  const foods = apiGetFoods()
  const user = apiGetUser()
  const newFood = {
    id: Date.now().toString(),
    ...data,
    author: user.nickname,
    authorAvatar: user.avatar,
    likes: 0,
    favs: 0,
    createTime: Date.now()
  }
  foods.unshift(newFood)
  setStorage(FOODS_KEY, foods)
  apiUpdateUser({ foods: user.foods + 1 })
  return newFood
}

export default {
  apiGetFoods,
  apiGetFoodDetail,
  apiToggleLike,
  apiToggleFav,
  apiIsLiked,
  apiIsFaved,
  apiGetUser,
  apiUpdateUser,
  apiGetMyFavs,
  apiGetMyFoods,
  apiAddFood
}
