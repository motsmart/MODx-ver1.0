MODx.grid.DatabaseTables=function(A){A=A||{};Ext.applyIf(A,{title:_("database_tables"),id:"grid-dbtable",url:MODx.config.connectors_url+"system/databasetables.php",fields:["Name","Rows","Data_size","Data_free","Effective_size","Index_length","Total_size"],paging:false,columns:[{header:_("database_table_tablename"),dataIndex:"Name",width:250},{header:_("database_table_records"),dataIndex:"Rows",width:70},{header:_("database_table_datasize"),dataIndex:"Data_size",width:70},{header:_("database_table_overhead"),dataIndex:"Data_free",width:70},{header:_("database_table_effectivesize"),dataIndex:"Effective_size",width:70},{header:_("database_table_indexsize"),dataIndex:"Index_length",width:70},{header:_("database_table_totalsize"),dataIndex:"Total_size",width:70}]});MODx.grid.DatabaseTables.superclass.constructor.call(this,A)};Ext.extend(MODx.grid.DatabaseTables,MODx.grid.Grid,{truncate:function(A){Ext.Ajax.request({url:this.config.url,params:{action:"truncate",t:A},scope:this,success:this.refresh});return false},optimize:function(A){Ext.Ajax.request({url:this.config.url,params:{action:"optimize",t:A},scope:this,success:this.refresh});return false}});Ext.reg("grid-databasetables",MODx.grid.DatabaseTables);