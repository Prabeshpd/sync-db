CREATE FUNCTION [dbo].square(@x INT) RETURNS INT
AS
BEGIN
    RETURN @x * @x;
END