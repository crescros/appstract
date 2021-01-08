import React, { useState } from 'react'
import { Dialog, TextField, Button, Grid, Box } from "@material-ui/core"

export default function UploadModal({ open, onClose, handleChangeNameInput, drawingName, handleUpload }) {

    return (
        <Dialog open={open} onClose={onClose}>
            <Box p={4}>
                <Grid container direction="column" spacing={3} >
                    <Grid item>
                        <TextField
                            value={drawingName}
                            label="picture name"
                            onChange={handleChangeNameInput}
                            autoFocus
                        />
                    </Grid>
                    <Grid item>
                        <Button width="100%" onClick={handleUpload}>upload</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
