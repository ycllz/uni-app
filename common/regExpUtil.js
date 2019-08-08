let regExpUtil = {}


/**
 * 判断一个字符串是否为空
 * @param str
 * @returns {boolean}
 */
regExpUtil.isNullOrEmpty = function(str) { //isNullOrEmpty
	if (str === undefined) return true
	if (str === null) return true
	if (str == '') return true
	return false
}

/**
 * 检查email格式
 * @param str
 */
regExpUtil.checkEmail = function(str) {
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
	return this.RegCheck(str, reg);
}
/**
 *检查用户名
 * 只包含中文、英文、下划线
 */
regExpUtil.checkName = function(str) {
	var reg = new RegExp("^[一-龥A-Za-z0-9_]+$"); //正则表达式
	return this.RegCheck(str, reg);
}
/**
 * 检查密码， 密码(由6-16数字和字母组成)
 */
regExpUtil.checkPsw = function(str) {
	var reg = new RegExp("/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/"); //正则表达式
	return this.RegCheck(str, reg);
}

/**
 * 校验是否是手机号码
 */
regExpUtil.isPhoneNum = function(str) {
	var p = /^(1[0-9])\d{9}$/;
	return p.test(str)
/* 	var reg = new RegExp("/^(1[0-9])\d{9}$/"); //正则表达式
	var r = str.match(reg);
	if (r != null) {
		return true;
	} */
}

/**
 * 校验是否是手机号码
 */
regExpUtil.isIdCard = function(str) {
	var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	return p.test(str)
	/* var reg = new RegExp("/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"); //正则表达式
	var r = str.match(reg);
	console.log(r)
	if (r != null) {
		return true;
	} */
}









export default regExpUtil
