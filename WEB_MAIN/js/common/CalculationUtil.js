//=======================Float 계산 함수들 시=======================
var TP_TRM1 = 0;
var TP_TRM2 = 10;
var TP_TRM3 = 100;
var TP_TRM4 = 1000;
var TP_TRM5 = 10000;

var TP_NDCM1 = 1;
var TP_NDCM2 = 2;   
var TP_NDCM3 = 3;  
var TP_NDCM4 = 4; 
var TP_NDCM5 = 5;
//---------------------------------문자 Float 치환 함수----------------------------
/**
 * 입력받은 문자를 Float으로 변환하여 Return함.
 * 시스템 기본 자리수로 포맷함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function strToFloat(strVal1){
	return getFlRound(parseFloat(strVal1), TP_TRM2);
}

/**
 * 입력받은 문자를 Float으로 변환하여 Return함.
 * 사용자가 입력한 길이 만큼의 자리수로 포맷함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function strToFloatByNDecimalTp(strVal1, dcTp){
	return getFlRound(parseFloat(strVal1), dcTp);
}

function getFlRound(strVal1, floatN){
	return Math.round(floatN*strVal1)/floatN;
}

//----------------------------------더하기 함수들----------------------------------
/**
 * String을 입력하여 float으로 변환후 더하기
 * 기본 소수점 자릿수로 계산
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getSumFloat(strVal1, strVal2){
	var sumval = floatSum(parseFloat(strVal1), parseFloat(strVal2), TP_TRM2);
	return sumval;
}

/**
 *  String을 입력하여 float으로 변환후 더하기
 *  소수점 자릿수를 사용자가 지정
 *  @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getSumFloatByNDecimalTp(strVal1, strVal2, dcTp){
	var sumval = floatSum(parseFloat(strVal1), parseFloat(strVal2), dcTp);
	return sumval;
}

/**
 * 실제 Float Value를 계산하는 메소드임
 * 지정된 소수점 자릿수로 변환하여 리턴함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function floatSum(inVal1, inVal2, floatN){
	var tmpSum = inVal1+inVal2;
	tmpSum = (floatN*tmpSum)/floatN;
	return tmpSum;
}

//----------------------------------빼기 함수들----------------------------------
/**
 * String을 입력하여 float으로 변환후 더하기
 * 기본 소수점 자릿수로 계산
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getMinusFloat(strVal1, strVal2){
	var sumval = floatMinus(parseFloat(strVal1), parseFloat(strVal2), TP_TRM2);
	return sumval;
}

/**
 * String을 입력하여 float으로 변환후 더하기
 *  소수점 자릿수를 사용자가 지정
 *  @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getMinusFloatByNDecimalTp(strVal1, strVal2, dcTp){
	var sumval = floatMinus(parseFloat(strVal1), parseFloat(strVal2), dcTp);
	return sumval;
}

/**
 * 실제 Float Value를 계산하는 메소드임
 * 지정된 소수점 자릿수로 변환하여 리턴함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function floatMinus(inVal1, inVal2, floatN){
	var tmpSum = inVal1-inVal2;
	tmpSum = (floatN*tmpSum)/floatN;
	return tmpSum;
}

//----------------------------------곱하기 함수들----------------------------------
/**
 * String을 입력하여 float으로 변환후 곱하기
 * 기본 소수점 자릿수로 계산
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getMultiplyFloat(strVal1, strVal2){
	var sumval = floatMultiply(parseFloat(strVal1), parseFloat(strVal2), TP_TRM2);
	return sumval;
}

/**
 * String을 입력하여 float으로 변환후 곱하기
 *  소수점 자릿수를 사용자가 지정
 *  @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getMultiplyFloatByNDecimalTp(strVal1, strVal2, dcTp){
	var sumval = floatMultiply(parseFloat(strVal1), parseFloat(strVal2), dcTp);
	return sumval;
}

/**
 * 실제 Float Value를 계산하는 메소드임
 * 지정된 소수점 자릿수로 변환하여 리턴함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function floatMultiply(inVal1, inVal2, floatN){
	var tmpSum = inVal1*inVal2;
	tmpSum = (floatN*tmpSum)/floatN;
	return tmpSum;
}

//----------------------------------나누기 함수들----------------------------------
/**
 * String을 입력하여 float으로 변환후 나누기
 * 기본 소수점 자릿수로 계산
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getDivideFloat(strVal1, strVal2){
	var sumval = floatDivide(parseFloat(strVal1), parseFloat(strVal2), TP_TRM2);
	return sumval;
}

/**
 * String을 입력하여 float으로 변환후 나누기
 *  소수점 자릿수를 사용자가 지정
 *  @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function getDivideFloatByNDecimalTp(strVal1, strVal2, dcTp){
	var sumval = floatDivide(parseFloat(strVal1), parseFloat(strVal2), dcTp);
	return sumval;
}

/**
 * 실제 Float Value를 계산하는 메소드임
 * 지정된 소수점 자릿수로 변환하여 리턴함
 * @author Kang,Jung-Gu(CyberLogitec Inc.)
 */
function floatDivide(inVal1, inVal2, floatN){
	var tmpSum = inVal1/inVal2;
	tmpSum = (floatN*tmpSum)/floatN;
	
//	tmpSum = Math.floor(floatN*tmpSum)/floatN;
	
	
	return tmpSum;
}

//=======================Float 계산 함수들 끝=======================

/*
 * 자리수 변환 함수
 * n 입력값, digits 자리수
 */
function roundXL(n, digits){
	if(digits >= 0) return parseFloat(n.toFixed(digits));
	
	digits = Math.pow(10, digits);
	var t = Math.round(n * digits) / digits;
	
	return parseFloat(t.toFixed(0));
}