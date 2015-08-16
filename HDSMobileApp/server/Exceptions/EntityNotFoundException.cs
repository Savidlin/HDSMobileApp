using System;
using System.Runtime.Serialization;

namespace HDSMobileApp.Exceptions
{
    /// <summary>
    /// <para>
    /// This exception is used by if not found entity error happen.
    /// </para>
    /// </summary>
    /// <remarks>
    /// <para>
    /// This exception extends ApplicationException.
    /// </para>
    /// </remarks>
    /// <threadsafety>
    /// This class isn't thread safe, because the base class is not thread safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [Serializable]
    public class EntityNotFoundException : ApplicationException
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="EntityNotFoundException"/> class.
        /// </para>
        /// </summary>
        public EntityNotFoundException()
        {
        }

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="EntityNotFoundException"/> class
        /// with a specified error message.
        /// </para>
        /// </summary>
        /// <param name="message">
        /// The message that describes the error.
        /// </param>
        public EntityNotFoundException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="EntityNotFoundException"/> class
        /// with a specified error message and a reference to the inner exception that is the cause of this exception.
        /// </para>
        /// </summary>
        /// <param name="message">
        /// The error message that explains the reason for the exception.
        /// </param>
        /// <param name="innerException">
        /// The exception that is the cause of the current exception, or a null reference if no inner exception is
        /// specified.
        /// </param>
        public EntityNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="EntityNotFoundException"/> class
        /// with serialized data.
        /// </para>
        /// </summary>
        /// <param name="info">
        /// The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.
        /// </param>
        /// <param name="context">
        /// The <see cref="StreamingContext"/> that contains contextual information about the source or destination.
        /// </param>
        protected EntityNotFoundException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
