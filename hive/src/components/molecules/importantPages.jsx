import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const ImportantPages = ({  }) => {
    const navigate = useNavigate();
    return (
        <Box
            width="700px"
            height="300px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
        >
            <Box
                width="200px"
                height="200px"
                border="1px solid #E0E0E0"
                borderRadius="8px"
                display="flex"
                flexDirection="column"
                p="8px"
                gap="1px"
                bgcolor={"white"}
                boxShadow={1}
            >
                {/* Child safety Information */}
                <Box display="flex" alignItems="center" flexDirection="column" mt="8px">
                    <Typography
                        width="100px"
                        height="100px"
                        marginTop="5px"
                        marginBottom="25px"
                    >
                        <img
                            src={'/assets/images/ChildSafety.png'}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                        <Link to={`https://www.health.nsw.gov.au/parvan/childprotect/Pages/default.aspx#:~:text=Contact%20the%20Community%20Services%20Child,the%20online%20Mandatory%20Reporter%20Guide.`} target="_blank"> Children Protection Information</Link>
                    </Typography>
                </Box>
            </Box>

            <Box
                width="200px"
                height="200px"
                border="1px solid #E0E0E0"
                borderRadius="8px"
                display="flex"
                flexDirection="column"
                p="8px"
                gap="1px"
                bgcolor={"white"}
                boxShadow={1}
            >
                {/* working with childrens check */}
                <Box display="flex" alignItems="center" flexDirection="column" mt="8px">
                    <Typography
                        width="100px"
                        height="100px"
                        marginTop="5px"
                        marginBottom="25px"
                    >
                        <img
                            src={'/assets/images/NSWGovernment.png'}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                        <Link to={`https://www.service.nsw.gov.au/transaction/apply-for-a-working-with-children-check`} target="_blank"> Working with Children Check</Link>
                    </Typography>
                </Box>
            </Box>

            <Box
                width="200px"
                height="200px"
                border="1px solid #E0E0E0"
                borderRadius="8px"
                display="flex"
                flexDirection="column"
                p="8px"
                gap="1px"
                bgcolor={"white"}
                boxShadow={1}
            >
                {/* terms and conditons */}
                <Box display="flex" alignItems="center" flexDirection="column" mt="8px">
                    <Typography
                        width="100px"
                        height="100px"
                        marginTop="5px"
                        marginBottom="25px"
                    >
                        <img
                            src={'/assets/images/TermsAndConditions.png'}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                        <Link to={'/terms-conditions'}> Hive Terms of Services </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ImportantPages;
