import flex from './flex'
import flexItem from './flex-item'

const FlexLayout = {
	install: (Vue) => {
		Vue.component('flex', flex)
		Vue.component('flex-item', flexItem)
	}
}

export default FlexLayout
