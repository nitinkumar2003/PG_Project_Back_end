const _writeConcern={
    writeConcern:{
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}

module.exports=_writeConcern