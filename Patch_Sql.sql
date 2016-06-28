/***********************************************************************
* no.           : 12
* author        : 차응절
* since         : 2016-04-26
* redmine no    : #52038
* redmine title : [CLC]Report-B/L 발급 수 리포트 필요 
* description   : [CLC]Report-B/L 발급 수 리포트 필요 
***********************************************************************/


ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_1] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_2] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_3] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_4] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_5] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ALTER COLUMN  [DESC_6] NVARCHAR(200) 
GO

ALTER TABLE [tb_ctmz_rpt] ADD [DESC_7] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ADD [TP_7] NVARCHAR(1) 
GO

ALTER TABLE [tb_ctmz_rpt] ADD [DESC_8] NVARCHAR(200)
GO 
ALTER TABLE [tb_ctmz_rpt] ADD [TP_8] NVARCHAR(1) 
GO

ALTER TABLE [tb_ctmz_rpt] ADD [DESC_9] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ADD [TP_9] NVARCHAR(1) 
GO

ALTER TABLE [tb_ctmz_rpt] ADD [DESC_10] NVARCHAR(200) 
GO
ALTER TABLE [tb_ctmz_rpt] ADD [TP_10] NVARCHAR(1) 
GO

ALTER TABLE [tb_ctmz_rpt] ADD [RMK] NVARCHAR(1000) 
GO


INSERT 
INTO
tb_ctmz_rpt
(       rpt_seq,       rpt_title,   desc_1,    tp_1,       desc_2,    tp_2,    desc_3,       tp_3,    desc_4,    tp_4,       desc_5,    tp_5,    desc_6,       tp_6,    hdr_txt,   qry_txt,       rgst_usrid,         rgst_ofc_cd,        rgst_tms,       modi_usrid,         modi_ofc_cd,        modi_tms              ,desc_7,   tp_7     ,desc_8,   tp_8     ,desc_9,   tp_9     ,desc_10,   tp_10     ,rmk      ) SELECT
(SELECT
ISNULL(MAX(rpt_seq),
0) + 1 
FROM
tb_ctmz_rpt),
'OCEAN/AIR B/L' ,
'RGST FROM (YYYYMMDD)' ,
'D' ,
'RGST TO (YYYYMMDD)' ,
'D' ,
'MODI FROM (YYYYMMDD)' ,
'D' ,
'MODI TO (YYYYMMDD)' ,
'D' ,
'EXPORT(O)/IMPORT(I)' ,
'S' ,
'B/L TYPE' ,
'S' ,
'OPERATOR ID|OCEAN/AIR|MASTER/HOUSE|B/L TYPE|NUMBER OF B/L ISSUED' ,
'select 
	DATA1,DATA2,DATA3,DATA4,count(1) DATA5
	from
	(SELECT 

BND.ISSUED_BY AS DATA1,

(CASE WHEN BL.AIR_SEA_CLSS_CD = ''S'' THEN ''OCEAN'' ELSE ''AIR'' END) AS DATA2,
(CASE WHEN BL.BIZ_CLSS_CD = ''M'' THEN ''MASTER'' ELSE ''HOUSE'' END) AS DATA3,
(SELECT CD_NM FROM TB_COM_CD_DTL WHERE CD_VAL = BL.HBL_TP_CD  AND COM_CD = ''C016'' AND USE_FLG = ''Y'') AS DATA4,
BL.BL_NO AS DATA5
,BL.AIR_SEA_CLSS_CD
,BL.BIZ_CLSS_CD
,BL.HBL_TP_CD
,BND.BND_CLSS_CD
FROM TB_INTG_BL BL , TB_ADD_INFO_BND BND
WHERE BL.INTG_BL_SEQ = BND.INTG_BL_SEQ 


AND  CONVERT(VARCHAR(8), BL.RGST_TMS, 112) BETWEEN (select case when <#1> = ''%'' then   ''11111111''  else   <#1>  end) AND (select case when <#2> = ''%'' then   ''99990101''  else   <#2>  end)
AND  CONVERT(VARCHAR(8), BL.MODI_TMS, 112) BETWEEN (select case when <#3> = ''%'' then   ''11111111''  else   <#3>  end) AND (select case when <#4> = ''%'' then   ''99990101''  else   <#4>  end)
and 
(select case when <#5> = ''%'' then   ''1''  else   BND.BND_CLSS_CD   end) = 
(select case when <#5> = ''%'' then   ''1''  else   <#5>  end)

and 
(select case when <#6> = ''%'' then   ''1''  else   BL.HBL_TP_CD   end) = 
(select case when <#6> = ''%'' then   ''1''  else   <#6>  end)

and 
(select case when <#7> = ''%'' then   ''1''  else   BL.AIR_SEA_CLSS_CD   end) = 
(select case when <#7> = ''%'' then   ''1''  else   <#7>  end)

and 
(select case when <#8> = ''%'' then   ''1''  else   BND.ISSUED_BY  end) = 
(select case when <#8> = ''%'' then   ''1''  else   <#8>  end)
) X
group by DATA1,DATA2,DATA3,DATA4
order by DATA1,DATA2,DATA3,DATA4' ,
'cltmaster' ,
'LAX' ,
GETDATE(),
'cltmaster' ,
'LAX' ,
GETUTCDATE()              ,
'DEPARTMENT(S:OCEAN,A:AIR)' ,
'S'        ,
'OPERATOR ID' ,
'S'        ,
'' ,
''        ,
'' ,
''        ,
'B/L TYPE (CL:CO-LOAD,DR:DIRECT,DT:DIRECT TRIANGLE,FW:FORWARDING,NR:NORMAL,TP:THIRD PARTY,TR:TRIANGLE)'


GO

/***********************************************************************
* no.           : 21
* author        : 설영철
* since         : 2016-05-12
* redmine no    : #52475
* redmine title : BL Interface
* description   : 
***********************************************************************/
INSERT 
    INTO
        tb_pgm
        (  pgm_seq,     mnu_seq,      pgm_nm,     pgm_url,             
		   pgm_desc,    srt_seq,      use_flg,    rgst_usrid,  
		   rgst_ofc_cd,  rgst_tms,   modi_usrid,   modi_ofc_cd,  
		   modi_tms, role_grd          )
      select MAX(pgm_seq) + 1,     (select min(mnu_seq) from tb_mnu where MNU_NM = 'Utility') /**P*/,     'B/L Interface' /**P*/,   './MGT_ITF_0010.clt' /**P*/,
	         'B/L Interface' /**P*/,    (select max(SRT_SEQ) + 1 from tb_pgm where MNU_SEQ = (select min(mnu_seq) from tb_mnu where MNU_NM = 'Utility')) /**P*/,     'Y' /**P*/,              'cltmaster' /**P*/,  
			 'LAC' /**P*/, GETDATE(),      'cltmaster' /**P*/,      'LAC' /**P*/,  
			 GETUTCDATE(), 1  
		from tb_pgm 	

GO

INSERT TB_PGM_ROLE (role_cd, pgm_seq, 
        rgst_usrid, rgst_ofc_cd, rgst_tms, 
        ATTR1, ATTR2, ATTR3, ATTR4, ATTR5, ATTR6, ATTR7, ATTR8, ATTR9, 
        ATTR_EXTENSION) 
    SELECT 'Master', PGM_SEQ, 
            'cltmaster', 'CLT', GETDATE(), 
            'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 
            '' 
    FROM tb_pgm 
WHERE PGM_URL = './MGT_ITF_0010.clt' 
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO


CREATE TABLE [dbo].[TB_INTG_BL_EDI_TEMP](
	[BL_SEQ] [varchar](20) NOT NULL,
	[AMS_NO] [varchar](20) NULL,
	[BIZ_CLSS_CD] [varchar](6) NULL,
	[BL_NO] [varchar](40) NOT NULL,
	[DEL_CD] [varchar](5) NULL,
	[DEL_NM] [varchar](50) NULL,
	[MK_TXT] [nvarchar](4000) NULL,
	[DESC_TXT] [nvarchar](4000) NULL,
	[ETD_DT_TM] [varchar](12) NULL,
	[ETA_DT_TM] [varchar](12) NULL,
	[EXPRESS_TP_CD] [varchar](6) NULL,
	[FM_SVC_TERM_CD] [varchar](6) NULL,
	[TO_SVC_TERM_CD] [varchar](6) NULL,
	[FNL_DEST_LOC_CD] [varchar](5) NULL,
	[FNL_DEST_LOC_NM] [varchar](50) NULL,
	[POD_CD] [varchar](5) NULL,
	[POD_NM] [varchar](50) NULL,
	[POL_CD] [varchar](5) NULL,
	[POL_NM] [varchar](50) NULL,
	[POR_CD] [varchar](5) NULL,
	[POR_NM] [varchar](50) NULL,
	[REP_CMDT_NM] [varchar](300) NULL,
	[SHP_MOD_CD] [varchar](6) NULL,
	[DELT_FLG] [varchar](1) NOT NULL,
	[RGST_USRID] [varchar](12) NOT NULL,
	[RGST_OFC_CD] [varchar](10) NOT NULL,
	[RGST_TMS] [datetime] NOT NULL,
	[MODI_USRID] [varchar](12) NOT NULL,
	[MODI_OFC_CD] [varchar](10) NOT NULL,
	[MODI_TMS] [datetime] NOT NULL,
 CONSTRAINT [PK_TB_INTG_BL_EDI_TEMP_01] PRIMARY KEY CLUSTERED 
(
	[BL_SEQ] ASC,
	[BL_NO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TB_CNTR_LIST_EDI_TEMP](
	[BL_SEQ] [varchar](20) NOT NULL,
	[CNTR_LIST_SEQ] [numeric](12, 0) NOT NULL,
	[BIZ_CLSS_CD] [varchar](6) NOT NULL,
	[BL_NO] [varchar](40) NOT NULL,
	[CGO_MEAS] [numeric](16, 6) NULL,
	[CGO_PCK_QTY] [numeric](7, 0) NULL,
	[CGO_PCK_UT] [varchar](6) NULL,
	[CGO_WGT] [numeric](14, 2) NULL,
	[CNTR_NO] [varchar](14) NULL,
	[CNTR_TPSZ_CD] [varchar](6) NULL,
	[SEAL_NO1] [varchar](20) NULL,
	[DELT_FLG] [varchar](1) NOT NULL,
	[RGST_USRID] [varchar](12) NOT NULL,
	[RGST_OFC_CD] [varchar](10) NOT NULL,
	[RGST_TMS] [datetime] NOT NULL,
	[MODI_USRID] [varchar](12) NOT NULL,
	[MODI_OFC_CD] [varchar](10) NOT NULL,
	[MODI_TMS] [datetime] NOT NULL,
 CONSTRAINT [PK_TB_CNTR_LIST_EDI_TEMP_01] PRIMARY KEY CLUSTERED 
(
	[BL_SEQ] ASC,
	[CNTR_LIST_SEQ] ASC,
	[BL_NO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TB_BL_PRNR_EDI_TEMP](
	[BL_SEQ] [varchar](20) NOT NULL,
	[BL_NO] [varchar](40) NOT NULL,
	[BIZ_CLSS_CD] [varchar](6) NOT NULL,
	[BL_TRDP_TP_CD] [varchar](6) NOT NULL,
	[TRDP_CNT_CD] [varchar](6) NOT NULL,
	[TRDP_CD] [varchar](20) NULL,
	[TRDP_NM] [varchar](50) NULL,
	[TRDP_PIC] [varchar](50) NULL,
	[TRDP_PHN] [varchar](30) NULL,
	[TRDP_FAX] [varchar](30) NULL,
	[TRDP_EML] [varchar](100) NULL,
	[TRDP_ADDR] [varchar](400) NULL,
	[RGST_USRID] [varchar](12) NOT NULL,
	[RGST_OFC_CD] [varchar](10) NOT NULL,
	[RGST_TMS] [datetime] NOT NULL,
	[MODI_USRID] [varchar](12) NOT NULL,
	[MODI_OFC_CD] [varchar](10) NOT NULL,
	[MODI_TMS] [datetime] NOT NULL,
	[DELT_FLG] [varchar](1) NOT NULL,
 CONSTRAINT [PK_TB_BL_PRNR_EDI_TEMP_01] PRIMARY KEY CLUSTERED 
(
	[BL_SEQ] ASC,
	[BL_TRDP_TP_CD] ASC,
	[TRDP_CNT_CD] ASC,
	[BIZ_CLSS_CD] ASC,
	[BL_NO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO