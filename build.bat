@echo off
@echo PLATFORM UPDATE
START /WAIT phonegap platform update ios android

@echo COMMIT REPOSITORY
git add .
git commit -a -m 'joe-commit'
