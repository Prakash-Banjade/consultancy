import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApplicationsModule } from "src/applications/applications.module";
import { AuthModule } from "src/auth/auth.module";
import { BritishCounsilModule } from "src/british-counsil/british-counsil.module";
import { CategoriesModule } from "src/categories/categories.module";
import { CompaniesModule } from "src/companies/companies.module";
import { CounselorsModule } from "src/counselors/counselors.module";
import { CountriesModule } from "src/countries/countries.module";
import { CoursesModule } from "src/courses/courses.module";
import { FilesModule } from "src/files/files.module";
import { AcademicQualificationsModule } from "src/students/academic-qualifications/academic-qualifications.module";
import { PersonalInfosModule } from "src/students/personal-infos/personal-infos.module";
import { StudentsModule } from "src/students/students.module";
import { WorkExperiencesModule } from "src/students/work-experiences/work-experiences.module";
import { UniversitiesModule } from "src/universities/universities.module";
import { UsersModule } from "src/users/users.module";

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Consultancy')
        .setDescription('Backend API documentation for CONSULTANCY CRM')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            }
        )
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        include: [
            AuthModule,
            UsersModule,
            FilesModule,
            CategoriesModule,
            BritishCounsilModule,
            CountriesModule,
            UniversitiesModule,
            CoursesModule,
            StudentsModule,
            PersonalInfosModule,
            AcademicQualificationsModule,
            WorkExperiencesModule,
            ApplicationsModule,
            CounselorsModule,
            CompaniesModule,
        ],
    });

    SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Consultancy',
        // customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
        // customJs: [
        //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        // ],
        // customCssUrl: [
        //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
        // ],
    });
}