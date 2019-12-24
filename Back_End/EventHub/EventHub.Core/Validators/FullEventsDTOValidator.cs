using EventHub.Core.DTOs;
using FluentValidation;
using FluentValidation.Results;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventHub.Core.Validators
{
    public class FullEventsDTOValidator : AbstractValidator<FullEventsDTO>
    {
        public FullEventsDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Name.Length)
                .LessThan(p => 51);


            RuleFor(x => x.Description)
                .Custom((dto, context) =>
                {
                    var length = dto?.Length;
                    if (length == null)
                        return;
                    if(length > 1024)
                        context.AddFailure(new ValidationFailure(
                       "Dec=scription length",
                       $" '{length}' must be less then 1025 characters"
                       ));
                });



            RuleFor(x => x.StartTime)
                .NotNull()
                .NotEmpty()
                .GreaterThan(p => DateTime.UtcNow);

            RuleFor(x => x)
                .Custom((dto, context) =>
                {
                    var st = dto.StartTime;
                    var end = dto.EndTime;
                    if (end == DateTime.MinValue)
                        return;
                    if (st < end)
                        return;
                    context.AddFailure(new ValidationFailure(
                        "End Time",
                        $" '{end}' should be after start time"
                        ));
                }
               );

        }
    }


    //public class EndTimeValidator : PropertyValidator
    //{
    //    private readonly DateTime _startTime;
    //    private readonly DateTime _endTime;
    //    public EndTimeValidator(DateTime start, DateTime end) : base(" End time should be after start time")
    //    {
    //        _startTime = start;
    //        _endTime = end;
    //    }

    //    protected override bool IsValid(PropertyValidatorContext context)
    //    {
    //        if (_endTime > _startTime)
    //            return true;
    //        return false;
    //    }
    //}

    //public static class EndTimeValidatorExtension
    //{
    //    public static bool EndTimeValidator<FullEventsDTO>(
    //        this FullEventsDTO rule, DateTime start, DateTime end)
    //    {
    //        return end < start ? true : false;
    //    }
    //}
}
