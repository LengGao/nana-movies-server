/*
Navicat MySQL Data Transfer

Source Server         : 183.63.80.66_2238
Source Server Version : 50633
Source Host           : 183.63.80.66:2238
Source Database       : db_nana_movie

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2020-01-02 14:19:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_advertisement
-- ----------------------------
DROP TABLE IF EXISTS `tb_advertisement`;
CREATE TABLE `tb_advertisement` (
  `advertisementId` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '广告Ifd',
  `advertisementCover` varchar(2003) DEFAULT NULL COMMENT '广告封面',
  `advertisementLink` text COMMENT '广告链接',
  `upDate` datetime DEFAULT NULL COMMENT '上传时间',
  PRIMARY KEY (`advertisementId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_advertisement
-- ----------------------------
INSERT INTO `tb_advertisement` VALUES ('0000000001', null, null, '2020-01-02 14:05:09');

-- ----------------------------
-- Table structure for tb_author
-- ----------------------------
DROP TABLE IF EXISTS `tb_author`;
CREATE TABLE `tb_author` (
  `authorId` char(10) NOT NULL COMMENT '作者Id',
  `authorName` varchar(20) NOT NULL COMMENT '作者名',
  `authorHeader` varchar(2003) DEFAULT NULL COMMENT '作何头像',
  `authorFrom` varchar(20) DEFAULT NULL COMMENT '作何来自哪里',
  `authorSex` int(1) DEFAULT NULL COMMENT '作者性别',
  `authorStatus` int(1) DEFAULT NULL COMMENT '作者状态 时否被禁用等',
  `authorAge` int(3) DEFAULT NULL COMMENT '作者年龄',
  `authorPhone` varchar(11) DEFAULT NULL COMMENT '电话号码',
  `authorNickName` varchar(20) DEFAULT NULL COMMENT '昵称',
  `authorProvince` varchar(6) DEFAULT NULL COMMENT '省份',
  `authorCity` varchar(10) DEFAULT NULL COMMENT '城市',
  `anthorCountry` varchar(10) DEFAULT NULL COMMENT '国家',
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_author
-- ----------------------------
INSERT INTO `tb_author` VALUES ('a001', 'nana那', 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg', '川师大', '0', '1', null, null, 'na', '', null, null);

-- ----------------------------
-- Table structure for tb_auths
-- ----------------------------
DROP TABLE IF EXISTS `tb_auths`;
CREATE TABLE `tb_auths` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '用户序号',
  `authorId` char(10) NOT NULL COMMENT '用户表对应的主键',
  `identitytype` varchar(10) NOT NULL COMMENT '登录类别，如：系统用户、邮箱、手机，或者第三方的QQ、微信、微博；',
  `identifier` varchar(20) NOT NULL COMMENT '身份唯一标识，如：登录账号、邮箱地址、手机号码、QQ号码、微信号、微博号；',
  `credental` varchar(255) NOT NULL COMMENT '站内账号是密码、第三方登录是Token',
  `ifverified` int(1) NOT NULL DEFAULT '0' COMMENT '验证状态 0标识为验证 1 标识验证',
  `token` varchar(255) NOT NULL COMMENT 'API token',
  PRIMARY KEY (`id`),
  KEY `auths_author` (`authorId`) USING BTREE,
  CONSTRAINT `auths_author` FOREIGN KEY (`authorId`) REFERENCES `tb_author` (`authorId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_auths
-- ----------------------------
INSERT INTO `tb_auths` VALUES ('0000000001', 'a001', '站内', 'admin', '123', '0', '');

-- ----------------------------
-- Table structure for tb_notice
-- ----------------------------
DROP TABLE IF EXISTS `tb_notice`;
CREATE TABLE `tb_notice` (
  `noticeId` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '通知ID',
  `noticeLink` text COMMENT '通知链接',
  `noticeContent` varchar(255) DEFAULT NULL COMMENT '通知内容',
  `noticeStartDateTime` datetime DEFAULT NULL COMMENT '通知开始日期',
  `noticeEndDateTime` datetime DEFAULT NULL COMMENT '通知结束日期',
  PRIMARY KEY (`noticeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_notice
-- ----------------------------
INSERT INTO `tb_notice` VALUES ('00000000001', '', '通知消息', '2020-01-02 14:03:13', '2020-02-01 14:03:19');

-- ----------------------------
-- Table structure for tb_resource_relationship
-- ----------------------------
DROP TABLE IF EXISTS `tb_resource_relationship`;
CREATE TABLE `tb_resource_relationship` (
  `resourceId` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '资源Id',
  `resourceType` varchar(4) NOT NULL COMMENT '资源类型  电影01，图片 02',
  `authorId` char(10) NOT NULL COMMENT '作者Id',
  `worksId` char(10) NOT NULL COMMENT '作评id',
  `publishTime` datetime DEFAULT NULL COMMENT '发表时间',
  `lowerTime` datetime DEFAULT NULL COMMENT '下架时间',
  PRIMARY KEY (`resourceId`),
  KEY `author_resource` (`authorId`),
  KEY `works_resource` (`worksId`),
  KEY `workstype_resource` (`resourceType`) USING BTREE,
  CONSTRAINT `author_resource` FOREIGN KEY (`authorId`) REFERENCES `tb_author` (`authorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `works_resource` FOREIGN KEY (`worksId`) REFERENCES `tb_works` (`worksId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_resource_relationship
-- ----------------------------
INSERT INTO `tb_resource_relationship` VALUES ('0000000001', '01', 'a001', 'w001', '2020-01-02 14:14:41', '2020-02-01 14:14:44');

-- ----------------------------
-- Table structure for tb_works
-- ----------------------------
DROP TABLE IF EXISTS `tb_works`;
CREATE TABLE `tb_works` (
  `worksId` char(10) NOT NULL COMMENT '作品ID',
  `worksName` varchar(50) NOT NULL COMMENT '作品名称',
  `category` varchar(20) DEFAULT NULL COMMENT '类别',
  `worksCover` varchar(255) DEFAULT NULL COMMENT '作品封面',
  `worksLink` text COMMENT '作品链接',
  PRIMARY KEY (`worksId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_works
-- ----------------------------
INSERT INTO `tb_works` VALUES ('w001', '首秀', '搞笑', 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400');
