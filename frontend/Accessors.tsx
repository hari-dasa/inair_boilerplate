import {useRecordIds, useRecords, useBase} from '@airtable/blocks/ui';

export class Accessors
{
    public table;
    public tableName;

    constructor(tableName)
    {
        this.tableName = tableName;
        this.table = this.GeBaseTable();
    }
      GetBase(){
        return useBase();
    };
      
    GeBaseTable(){
        if(this.tableName.startsWith('tbl'))
            return this.GetBase().getTableByIdIfExists(this.tableName)
        return this.GetBase().getTableByNameIfExists(this.tableName);
    };
    
    GetRecords(sorts = null, viewName = null, byId = null) {
        // const table = GetTable(tableName);
    
        return useRecords(this.table);
    };
    
      SelectRecords(fieldName, viewName = null) {
        // const table = GetTable(tableName);;
        const queryResult = this.table.selectRecords({
            sorts: [{field: fieldName}],
            fields: [fieldName]
        });
        return useRecords(queryResult);
    };
    
      GetFields(fields = null){
    
        if(!fields)
            return this.table.fields;
    
        return this.table.fields.reduce(function(result, field) {
                if(fields.includes(field.name)) 
                    result.push(field);
                return result;
            },
        []);
    };
}