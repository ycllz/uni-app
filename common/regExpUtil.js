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
 * 检查密码， 密码(长度在6~18之间，只能包含字母、数字和下划线)：
 */
regExpUtil.checkPsw = function(str) {
	var reg = new RegExp("^[A-Za-z0-9_]{6,18}$"); //正则表达式
	return this.RegCheck(str, reg);
}












export default regExpUtil
