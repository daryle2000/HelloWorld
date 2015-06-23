@echo off
@echo PLATFORM UPDATE
phonegap platform update ios android

@echo COMMIT REPOSITORY
git add -A
git commit -a -m 'joe-commit'
