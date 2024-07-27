this is a nextjs and prisma setup with shadcn and react query

for database it is using sqlite add a .env here and add a DATABASE_URL="file:./dev.db"

open-graph image should be 1200x630px in size
and the file have to be named as opengraph-image.png

do not use google fonts directly as it sends the ip of the user to google servers and ip is a private information for this it is illegal so we use local fonts like /next/font/google

if we use notfound() imported from 'next/navigation' it will redirect us to the not found page if the data is not available
