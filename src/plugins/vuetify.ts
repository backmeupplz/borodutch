import Vue, { VueConstructor } from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { VuetifyIcons } from 'vuetify/types/services/icons'
import TelegramIcon from '@/icons/TelegramIcon.vue'
import FacebookIcon from '@/icons/FacebookIcon.vue'
import LinkedinIcon from '@/icons/LinkedinIcon.vue'
import GithubIcon from '@/icons/GithubIcon.vue'
import VkIcon from '@/icons/VkIcon.vue'
import EmailIcon from '@/icons/EmailIcon.vue'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import LoaderIcon from '@/icons/LoaderIcon.vue'

Vue.use(Vuetify)

const icons = {
  telegram: TelegramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  vk: VkIcon,
  email: EmailIcon,
  arrow: ArrowIcon,
  loader: LoaderIcon,
} as { [index: string]: VueConstructor<Vue> }
const iconsValues = Object.keys(icons).reduce(
  (p, c) => {
    p[c] = {
      component: icons[c],
    }
    return p
  },
  {} as Partial<VuetifyIcons>
)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: iconsValues,
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
  },
})
