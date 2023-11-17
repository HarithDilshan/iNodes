
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { Footer } from 'flowbite-react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright - MIT License - '}
            <Link color="inherit" href="https://github.com/HarithDilshan/iNodes">
                iNodes
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



// const footers = [
//     {
//         title: 'Company',
//         description: ['Team', 'History', 'Contact us', 'Locations'],
//     },
//     {
//         title: 'Features',
//         description: [
//             'Cool stuff',
//             'Random feature',
//             'Team feature',
//             'Developer stuff',
//             'Another one',
//         ],
//     },
//     {
//         title: 'Resources',
//         description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//     },
//     {
//         title: 'Legal',
//         description: ['Privacy policy', 'Terms of use'],
//     },
// ];

export const Footer_ = () => {

    return <>
        {/* Footer */}
        {/* <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
            }}
        >
            <Grid container spacing={4} justifyContent="space-evenly">
                {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map((item) => (
                                <li key={item}>
                                    <Link href="#" variant="subtitle1" color="text.secondary">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
        </Container> */}
        {/* End footer */}
        <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      </div>
    </Footer>
    </>
}

